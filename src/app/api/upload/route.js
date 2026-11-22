// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const image = formData.get('image');
//     const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

//     if (!image || !apiKey) {
//       return NextResponse.json({
//         success: true,
//         url: 'https://pexels.com',
//       });
//     }

//     const imgbbForm = new FormData();
//     imgbbForm.append('image', image);

//     const response = await fetch(`https://imgbb.com{apiKey}`, {
//       method: 'POST',
//       body: imgbbForm,
//     });

//     const data = await response.json();

//     if (data.success) {
//       return NextResponse.json({ success: true, url: data.data.url });
//     }

//     return NextResponse.json({
//       success: true,
//       url: 'https://pexels.com',
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: true,
//       url: 'https://pexels.com',
//     });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image file provided" },
        { status: 400 },
      );
    }

    const apiKey = "6fcb32a6cf26b2fc28e74a61db315a5c";

    const arrayBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const params = new URLSearchParams();
    params.append("image", base64Image);

    const response = await fetch(`https://imgbb.com{apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        url: data.data.display_url || data.data.url,
      });
    }

    return NextResponse.json(
      { success: false, message: "ImgBB rejected the image" },
      { status: 500 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}

