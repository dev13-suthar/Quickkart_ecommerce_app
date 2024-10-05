export const AddToCart = async(userId,productId)=>{
    try {
        const res = await fetch(`http://localhost:6008/user/addToCart`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                userId:userId,
                productId:productId
            })
        });
        const resData = await res.json();
        return resData
    } catch (error) {
        console.log(error.message)
    }
}

export const UserWithOrders = async(id)=>{
    try {
        const res = await fetch(`http://localhost:6008/user/userOrders/${id}`,{
            method:"GET",
        });
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error.message)
    }
}
