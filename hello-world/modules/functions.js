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