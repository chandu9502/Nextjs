import MobileSchema from "@/app/models/Mobile";
import Db from "@/app/utils/DbConnect";
import { NextResponse } from "next/server";

async function DbConnect(){
    await Db();
}
DbConnect();
export async function GET(){
    const data = await MobileSchema.find({});
    return NextResponse.json(data);
    // return NextResponse.json({name : 'abc',age : 45})
}

export async function POST(req){
    try{
        const {title, brand, price} = await req.json();
        console.log(title, brand, price)
        await MobileSchema.create({
            title,
            brand,
            price
        })
        return NextResponse.json({msg : 'added succesfully'},{status : 200})
    } catch(err){
        return NextResponse.json({msg : err})
    }
}

export async function PUT(req){
    const id = req.nextUrl.searchParams.get("id");
    console.log(id)
    const {title, brand,price} = await req.json();
    await MobileSchema.findByIdAndUpdate(id,{title, brand, price});
    return NextResponse.json('updated...');
}
export async function DELETE(req){
    const id = req.nextUrl.pathname.split('/').pop();
    await MobileSchema.findByIdAndDelete(id);
    return NextResponse.json('deleted...');
}