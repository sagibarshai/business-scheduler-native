export interface SubCatogory {
    time:string | null;
    price:number | null;
    name:string;
}
export interface Props {
    subCategories:SubCatogory[]
}