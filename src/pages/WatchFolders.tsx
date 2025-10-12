import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Session } from "@supabase/supabase-js";
import { FolderOpen, Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WatchFolder {
  id: string;
  folder_path: string;
  auto_import: boolean;
  last_scan: string | null;
  created_at: string;
}

export default function WatchFolders() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [watchFolders, setWatchFolders] = useState<WatchFolder[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        loadWatchFolders();
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadWatchFolders = async () => {
    // @ts-ignore - Types will be regenerated after migration
    const { data, error } = await (supabase
      .from('watch_folders') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setWatchFolders(data || []);
    }
  };

  const handleAddFolder = async () => {
    if (!window.electronAPI) {
      toast({
        title: 'Desktop Only',
        description: 'This feature requires the desktop app',
        variant: 'destructive',
      });
      return;
    }

    const paths = await window.electronAPI.openDirectory();
    if (!paths || paths.length === 0) return;
    const folderPath = paths[0];

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // @ts-ignore - Types will be regenerated after migration
    const { error } = await (supabase
      .from('watch_folders') as any)
      .insert({
        user_id: user.id,
        folder_path: folderPath,
        auto_import: true,
      });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Watch folder added successfully',
      });
      loadWatchFolders();

      // Start watching the folder
      if (window.electronAPI) {
        await window.electronAPI.watchDirectory(folderPath, folderPath);
      }
    }
  };

  const handleToggleAutoImport = async (id: string, currentValue: boolean) => {
    // @ts-ignore - Types will be regenerated after migration
    const { error } = await (supabase
      .from('watch_folders') as any)
      .update({ auto_import: !currentValue })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      loadWatchFolders();
    }
  };

  const handleDeleteFolder = async (id: string, folderPath: string) => {
    // @ts-ignore - Types will be regenerated after migration
    const { error } = await (supabase
      .from('watch_folders') as any)
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Watch folder removed',
      });
      loadWatchFolders();
      setDeletingId(null);

      // Stop watching the folder
      if (window.electronAPI) {
        await window.electronAPI.unwatchDirectory(folderPath);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Watch Folders</h1>
              <p className="text-muted-foreground">
                Automatically detect and import new PLR files from specified folders
              </p>
            </div>
            <Button onClick={handleAddFolder}>
              <Plus className="mr-2 h-4 w-4" />
              Add Watch Folder
            </Button>
          </div>

          {watchFolders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No watch folders yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add folders to automatically detect and import new PLR files
                </p>
                <Button onClick={handleAddFolder}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Watch Folder
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Watch Folders ({watchFolders.length})</CardTitle>
                <CardDescription>
                  Manage folders that are being monitored for new PLR content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Folder Path</TableHead>
                      <TableHead>Auto Import</TableHead>
                      <TableHead>Last Scan</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {watchFolders.map((folder) => (
                      <TableRow key={folder.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-md">{folder.folder_path}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleAutoImport(folder.id, folder.auto_import)}
                          >
                            {folder.auto_import ? (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                <Badge variant="default">Enabled</Badge>
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                <Badge variant="secondary">Disabled</Badge>
                              </>
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          {folder.last_scan
                            ? new Date(folder.last_scan).toLocaleString()
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          {new Date(folder.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingId(folder.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove watch folder?</AlertDialogTitle>
            <AlertDialogDescription>
              This will stop monitoring this folder for new PLR files. Existing imported
              files will not be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const folder = watchFolders.find(f => f.id === deletingId);
                if (folder) {
                  handleDeleteFolder(deletingId!, folder.folder_path);
                }
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
