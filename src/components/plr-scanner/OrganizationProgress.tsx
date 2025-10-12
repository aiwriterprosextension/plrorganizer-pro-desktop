import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2, File } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrganizationProgressProps {
  open: boolean;
  progress: number;
  currentFile: string;
  successCount: number;
  errorCount: number;
  errors: Array<{ file: string; error: string }>;
  totalFiles: number;
}

export default function OrganizationProgress({
  open,
  progress,
  currentFile,
  successCount,
  errorCount,
  errors,
  totalFiles,
}: OrganizationProgressProps) {
  const isComplete = progress >= 100;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {isComplete ? 'Organization Complete' : 'Organizing Files'}
          </DialogTitle>
          <DialogDescription>
            {isComplete
              ? `Successfully organized ${successCount} of ${totalFiles} files`
              : `Processing ${currentFile}...`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{successCount + errorCount} / {totalFiles} files</span>
              <span>{totalFiles - successCount - errorCount} remaining</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="p-2 bg-success/10 rounded">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{successCount}</div>
                <div className="text-xs text-muted-foreground">Successful</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="p-2 bg-destructive/10 rounded">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">{errorCount}</div>
                <div className="text-xs text-muted-foreground">Errors</div>
              </div>
            </div>
          </div>

          {/* Current File */}
          {!isComplete && currentFile && (
            <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground mb-1">
                  Currently processing:
                </div>
                <div className="text-sm font-medium truncate">{currentFile}</div>
              </div>
            </div>
          )}

          {/* Errors List */}
          {errors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <h4 className="font-semibold">Errors ({errors.length})</h4>
              </div>
              <ScrollArea className="h-40 border rounded-lg">
                <div className="p-2 space-y-2">
                  {errors.map((error, idx) => (
                    <div key={idx} className="p-2 bg-muted rounded text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <File className="h-3 w-3" />
                        <span className="font-medium truncate">{error.file}</span>
                      </div>
                      <div className="text-xs text-destructive pl-5">
                        {error.error}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Success Message */}
          {isComplete && errorCount === 0 && (
            <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-success" />
              <div>
                <div className="font-semibold text-success">All files organized successfully!</div>
                <div className="text-sm text-muted-foreground">
                  Your PLR library is now organized and ready to use.
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
