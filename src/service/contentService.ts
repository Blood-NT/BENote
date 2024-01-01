import { Contents } from "../interfaces/content.interface";
import { contentModel } from "../models/content.model";


const createContentService = async(uid:string,nid:number, data:string)=>{
    console.log("create content");
   
    try{
        const content:Contents|null = await contentModel.findOne({
            where:{
                nid:nid
            },
            order:[
                ['updateat','DESC']
            ]
        });
        

        if(content!=null && content.content===data){
                return 200;
        }
        const contents = await contentModel.create({
            uid:uid,
            nid:nid,
            content:data,
            updateat:new Date()
        });
        if(contents){
            return 200;
        }
        
    }
    catch(e){
        console.log("looix caapj nhaatj duwx lieeuj",e);
        return 404;
    }
}
const getContentService = async(nid:string)=>{
    // tìm content có id lớn nhất
    try{
        const content:Contents|null = await contentModel.findOne({
            where:{
                nid:nid
            },
            order:[
                ['updateat','DESC']
            ]
        });
        return content;
    }
    catch(e){
        return 404;
    }
}
const getAllContentService = async(nid:string)=>{
    try{
        const content = await contentModel.findAll({
            where:{
                nid:nid
            }
            ,order:[
                ['updateat','DESC']
            ]
        });
        return content;
    }
    catch(e){
        return 404;
    }
}

const updateContentService = async(nid:string)=>{
    // chỉ giữ lại 5 bản ghi gần nhất, xóa các bản ghi cũ hơn
    try{
        const content = await contentModel.findAll({
            where:{
                nid:nid
            },
            order:[
                ['updateat','DESC']
            ]
        });
        if(content.length>5){
            for(let i=5;i<content.length;i++){
                await contentModel.destroy({
                    where:{
                        cid:content[i].cid
                    }
                })
            }
        }
        return 200;
    }
    catch(e){
        return 404;
    }
}
export  {
    createContentService,
    getContentService,
    getAllContentService,
    updateContentService
}

