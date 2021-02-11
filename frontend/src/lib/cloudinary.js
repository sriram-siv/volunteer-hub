// pull out defaults and include arguments 

export const createWidget = (onSuccess) => {
  const widget = window.cloudinary.createUploadWidget(
    { 
      cloudName: 'dmhj1vjdf',
      uploadPreset: 'jisx4gi0',
      showUploadMoreButton: false
    },
    (error, result) => {
      if (result?.event === 'success') {
        onSuccess(result.info.url)
      }
    }
  )
  return widget
}