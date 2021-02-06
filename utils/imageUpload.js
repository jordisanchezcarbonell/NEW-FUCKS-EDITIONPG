export const imageUpload = async (images) => {
    let imgArr = []
    console.lof
    for(const item of images){
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", 'TEST123213213213123')
        formData.append("cloud_name", 'dvvsuufw5')
        
        const res = await fetch("https://api.cloudinary.com/v1_1/dvvsuufw5/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
}