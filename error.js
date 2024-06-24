export const createError=(message,status)=>{
    const err=new Error();
    err.message=message;
    err.status=status;
    return err;
}