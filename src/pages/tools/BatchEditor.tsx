
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, FileEdit, ChevronRight, FileSearch, Replace, Edit, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

export default function BatchEditor() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Batch Editor | Edit 100+ PLR Files Simultaneously | PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Discover how our Batch Editor solves time-consuming editing for PLR users. Make changes across multiple files at once with search and replace functionality. Try free today." 
        />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">PLR Batch Editor: Edit Hundreds of PLR Files Simultaneously</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Tired of opening dozens of PLR files to make the same edits over and over? Our Batch Editor helps you modify hundreds of PLR files simultaneously with powerful search and replace capabilities. Used by efficient content creators to save hours on repetitive editing tasks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg" className="sm:text-lg">
              <Link to="/tools/batch-editor">
                Try Batch Editor Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="sm:text-lg">
              <a href="#features">
                See Features
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Main Benefits */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FileEdit className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Save Hours with Mass Editing Across Your PLR Library</h2>
                    <p className="text-muted-foreground">Modify up to 100+ files at once, eliminating the need to open each document individually. Perfect for branding updates and affiliate link changes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Replace className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Global Search and Replace Across Multiple File Types</h2>
                    <p className="text-muted-foreground">Works with DOCX, PDF, HTML, TXT, and more, allowing you to make consistent changes regardless of file format.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Edit className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Brand Consistency: Update Links and References in Bulk</h2>
                    <p className="text-muted-foreground">Maintain perfect brand consistency by updating company names, URLs, and references across your entire PLR collection with one action.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <FileSearch className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Advanced Filtering for Precision Batch Editing</h2>
                    <p className="text-muted-foreground">Filter files by type, content, or date to ensure you're only modifying the exact files you need, avoiding unintended changes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Advanced Features */}
          <h2 className="text-3xl font-bold mb-6">Advanced Editing Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Find and Replace with Regular Expressions</h3>
                <p className="text-sm text-muted-foreground">Use powerful regex patterns to find complex text structures and make precise replacements across your PLR library.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Smart Image Replacement Across Multiple Documents</h3>
                <p className="text-sm text-muted-foreground">Swap out generic PLR images with your branded visuals across all documents while maintaining proper formatting.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Conditional Text Modifications Based on Content Type</h3>
                <p className="text-sm text-muted-foreground">Apply different replacement rules based on the content context, ensuring appropriate changes for each document type.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Before/After Preview for Batch Changes</h3>
                <p className="text-sm text-muted-foreground">See exactly how your changes will affect each file before committing, ensuring you're making the right edits.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-16">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Can I undo batch edits if I make a mistake?</h3>
              <p className="text-muted-foreground">Yes, our system maintains temporary backups of your files before editing. You can restore the original versions for up to 7 days after making batch changes.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">What file formats are supported by the batch editor?</h3>
              <p className="text-muted-foreground">We currently support DOCX, PDF (with text layers), TXT, HTML, RTF, and Markdown files. Image search and replace works with JPG, PNG, and GIF formats.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">How do I batch edit only specific sections of my PLR files?</h3>
              <p className="text-muted-foreground">You can use our section targeting feature to limit changes to specific parts of your documents, such as headers, footers, or sections marked with custom tags.</p>
            </div>
          </div>
          
          {/* Use Cases */}
          <h2 className="text-3xl font-bold mb-6">PLR Batch Editing in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3">How to update your affiliate links across 50 PLR articles at once</h3>
                <p className="text-muted-foreground mb-4">See how one marketer updated all their affiliate links in just minutes after a program changed their tracking URLs, saving hours of manual editing.</p>
                <Button variant="outline" asChild>
                  <Link to="/resources/guides/batch-editing-affiliate-links">Read Case Study</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3">Replacing generic health claims in PLR content with compliant language</h3>
                <p className="text-muted-foreground mb-4">Learn how a health coach used batch editing to ensure all their PLR content met FTC compliance standards by replacing problematic phrases automatically.</p>
                <Button variant="outline" asChild>
                  <Link to="/resources/guides/compliant-health-content">Read Case Study</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* CTA */}
          <div className="bg-primary/5 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Save Hours on PLR Editing?</h2>
            <p className="text-lg mb-6">Transform how you customize PLR content with our powerful batch editor</p>
            <Button asChild size="lg">
              <Link to="/tools/batch-editor">
                Try Batch Editor Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
