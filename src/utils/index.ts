export const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      Authorization: `Token ${token}`,
      Accept: 'application/json'
    }
  } else {
    const env = process.env.NODE_ENV
    if (env !== 'development') {
      localStorage.clear()
    } else {
      console.log('Token not found')
    }
    return null
  }
}

export const formatErrorMessages = (errors: any) : Array<any> => {
  if(errors && Object.keys(errors).length > 0){
    const errs: Array<any> = [];
    Object.keys(errors).forEach(keyError => {
      console.log(keyError);
      if (Array.isArray(errors[keyError]) && errors[keyError].length > 0) {
        const valuesErr = errors[keyError];
        for(let index in valuesErr){
          // console.log(valuesErr[index]);
          errs.push(`${keyError} ${valuesErr[index]}`)
        }
      }
    })
    return errs;
  }
  return [];
}