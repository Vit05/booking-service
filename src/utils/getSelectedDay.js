const getSelectedDay = (val) => {
    return new Date(val.getFullYear(), val.getMonth(), val.getDate(), 0, 0, 0).valueOf()
}

export {getSelectedDay}