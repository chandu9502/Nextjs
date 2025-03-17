import MobileSchema from "@/app/models/Mobile";
import Db from "@/app/utils/DbConnect";
import { NextResponse } from "next/server";

const DbConnect = async () => {
  await Db();
};
DbConnect();

export async function PUT(req, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json('ID is missing', { status: 400 });
  }
  const { brand, title, price } = await req.json();
  if (!brand || !title || !price) {
    return NextResponse.json('Missing required fields (brand, title, price)', { status: 400 });
  }
  try {
    const exists = await MobileSchema.findById(id);
    if (!exists) {
      return NextResponse.json('No id found...', { status: 404 });
    }
    const updatedMobile = await MobileSchema.findByIdAndUpdate(
      id,
      { brand, title, price },
      { new: true }
    );

    if (!updatedMobile) {
      return NextResponse.json('Update failed', { status: 500 });
    }

    return NextResponse.json({ updatedMobile }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json('Internal server error', { status: 500 });
  }
}
