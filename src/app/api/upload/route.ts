import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises'; // Import mkdir
import path from 'path';
import { connect } from "@/dbConfig/dbConfig";
import SiteConfig from "@/models/siteConfigModel";

export const dynamic = 'force-dynamic'; 

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Prepare the path
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const fileName = 'resume.pdf';
    const filePath = path.join(uploadDir, fileName);

    // 2. SAFETY CHECK: Create the folder if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore error if folder already exists
    }
    
    // 3. Write the file
    await writeFile(filePath, buffer);

    // 4. Update Database
    const fileUrl = `/uploads/${fileName}`;
    await connect();
    
    await SiteConfig.findOneAndUpdate(
      { key: "global_config" },
      { resumeUrl: fileUrl },
      { new: true, upsert: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Resume uploaded successfully',
      url: fileUrl 
    });

  } catch (error: any) {
    console.error('Upload Error:', error); // Check your terminal for this!
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const config = await SiteConfig.findOne({ key: "global_config" });
    return NextResponse.json({ success: true, url: config?.resumeUrl || "" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}