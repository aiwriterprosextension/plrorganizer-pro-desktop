import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Monitor, 
  Apple, 
  Laptop,
  HardDrive,
  FolderSearch,
  Zap,
  Shield,
  CheckCircle2,
  ArrowRight,
  FileArchive
} from "lucide-react";

const platforms = [
  {
    name: "Windows",
    icon: Monitor,
    description: "Windows 10/11 (64-bit)",
    formats: [
      { name: "Installer (.exe)", size: "~85 MB", recommended: true },
      { name: "Portable (.zip)", size: "~90 MB", recommended: false }
    ],
    downloadUrl: "#",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "macOS",
    icon: Apple,
    description: "macOS 11+ (Intel & Apple Silicon)",
    formats: [
      { name: "Disk Image (.dmg)", size: "~95 MB", recommended: true },
      { name: "ZIP Archive", size: "~100 MB", recommended: false }
    ],
    downloadUrl: "#",
    color: "from-gray-600 to-gray-700"
  },
  {
    name: "Linux",
    icon: Laptop,
    description: "Ubuntu, Debian, Fedora & more",
    formats: [
      { name: "AppImage", size: "~90 MB", recommended: true },
      { name: "Debian (.deb)", size: "~85 MB", recommended: false }
    ],
    downloadUrl: "#",
    color: "from-orange-500 to-orange-600"
  }
];

const desktopFeatures = [
  {
    icon: HardDrive,
    title: "Full Disk Scanning",
    description: "Scan entire drives and folders for PLR content automatically"
  },
  {
    icon: FolderSearch,
    title: "Recursive Search",
    description: "Deep folder scanning with intelligent PLR detection"
  },
  {
    icon: FileArchive,
    title: "ZIP Analysis",
    description: "Inspect archive contents without extracting files"
  },
  {
    icon: Zap,
    title: "Batch Import",
    description: "Import hundreds of PLR packages in one click"
  },
  {
    icon: Shield,
    title: "Local Processing",
    description: "Files are analyzed locally before secure cloud upload"
  }
];

const requirements = {
  windows: ["Windows 10 or later (64-bit)", "4 GB RAM minimum", "200 MB disk space", "Internet connection for sync"],
  mac: ["macOS 11 (Big Sur) or later", "Apple Silicon or Intel processor", "4 GB RAM minimum", "200 MB disk space"],
  linux: ["Ubuntu 18.04+, Debian 10+, or Fedora 32+", "64-bit processor", "4 GB RAM minimum", "200 MB disk space"]
};

export default function Downloads() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Download Desktop App | PLR Organizer Pro"
        description="Download PLR Organizer Pro desktop app for Windows, macOS, and Linux. Scan your computer for PLR content, batch import files, and sync with the cloud."
        keywords={["PLR Organizer download", "desktop app", "Windows", "macOS", "Linux", "PLR scanner", "file organizer"]}
        canonical="/downloads"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Download className="w-3 h-3 mr-1" />
                Desktop App
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Download PLR Organizer Pro
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get the full-featured desktop app to scan your computer for PLR content, 
                batch import files, and organize your entire library with AI-powered tools.
              </p>
            </div>
          </div>
        </section>

        {/* Platform Downloads */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {platforms.map((platform) => (
                <Card key={platform.name} className="relative overflow-hidden hover:shadow-lg transition-all">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.color}`} />
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                      <platform.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                    <CardDescription>{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {platform.formats.map((format) => (
                      <div 
                        key={format.name}
                        className={`p-3 rounded-lg border ${format.recommended ? 'border-primary bg-primary/5' : 'border-border'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{format.name}</p>
                            <p className="text-xs text-muted-foreground">{format.size}</p>
                          </div>
                          {format.recommended && (
                            <Badge variant="default" className="text-xs">Recommended</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button className="w-full mt-4" size="lg" disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Version 1.0.0 • Build with GitHub
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Build Instructions */}
            <Card className="max-w-3xl mx-auto mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Build from Source (Developers)
                </CardTitle>
                <CardDescription>
                  Clone the repository and build the desktop app yourself
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <p className="text-muted-foreground"># Clone and build</p>
                  <p>git clone https://github.com/your-repo/plr-organizer-pro.git</p>
                  <p>cd plr-organizer-pro</p>
                  <p>npm install</p>
                  <p className="mt-2 text-muted-foreground"># Build for your platform</p>
                  <p>npm run electron:build:win &nbsp;&nbsp;<span className="text-muted-foreground"># Windows</span></p>
                  <p>npm run electron:build:mac &nbsp;&nbsp;<span className="text-muted-foreground"># macOS</span></p>
                  <p>npm run electron:build:linux <span className="text-muted-foreground"># Linux</span></p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Installers will be created in the <code className="bg-muted px-1 rounded">dist-electron</code> folder.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Desktop Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Desktop-Exclusive Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The desktop app unlocks powerful file system access for comprehensive PLR management
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {desktopFeatures.map((feature) => (
                <Card key={feature.title} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Web vs Desktop Comparison */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Web App vs Desktop App</h2>
              <p className="text-muted-foreground">
                Choose the right version for your workflow
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Web App
                  </CardTitle>
                  <CardDescription>Access from any browser</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Manual file upload",
                      "Single folder at a time",
                      "Cloud-based storage",
                      "All AI tools included",
                      "Access from anywhere",
                      "No installation required"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <a href="/dashboard">
                      Open Web App
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Desktop App
                    </CardTitle>
                    <Badge>Full Power</Badge>
                  </div>
                  <CardDescription>Maximum control & speed</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Scan entire computer for PLR",
                      "Multiple drives & folders",
                      "ZIP archive inspection",
                      "Batch import hundreds of files",
                      "File watcher for auto-import",
                      "Offline file organization"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" disabled>
                    Download Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">System Requirements</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Monitor className="w-5 h-5" />
                    Windows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {requirements.windows.map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Apple className="w-5 h-5" />
                    macOS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {requirements.mac.map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Laptop className="w-5 h-5" />
                    Linux
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {requirements.linux.map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
