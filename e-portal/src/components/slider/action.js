export const openModal = (teacherDetailsSlider) => {
    return {
        type: 'OPEN_MODAL',
         ...teacherDetailsSlider
    }
}