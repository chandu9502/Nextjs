import MobileSchema from "@/app/models/Mobile";
import Db from "@/app/utils/DbConnect";
import { NextResponse } from "next/server";

const DbConnect = async () => {
  await Db();
};
DbConnect();

export async function DELETE(req, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json("ID is missing", { status: 400 });
  }

  try {
    const deletedItem = await MobileSchema.findByIdAndDelete(id);
    console.log(deletedItem);
    if (!deletedItem) {
      return NextResponse.json("No item found to delete", { status: 404 });
    }
    return NextResponse.json("Item deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Unable to delete the item", { status: 500 });
  }
}
