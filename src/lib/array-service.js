function splitArray(slices,array){
    let sliceLength = array.length / slices
    let slicePosition = 0
    const arr = []
  
    for(let i=0; i<slices; i++){
        arr.push(array.slice(slicePosition,sliceLength))
        slicePosition+=10
        sliceLength+=10
    }
    return arr
}

export default splitArray