exports.success = (result) => {
    return {
        status: 'success',
        result: result
    }
}

exports.error = (msg) => {
    return {
        status: 'error',
        result: msg
    }
}

exports.isError = (err) => {
    return err instanceof Error
}

exports.display = (obj) => {
    if(this.isError(obj)){
        return this.error(obj.message)
    } else {
        return this.success(obj)
    }
}