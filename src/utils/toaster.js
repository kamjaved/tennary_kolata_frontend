import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "center",
    background: '#eceff1',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    width: 300,

    onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const makeToast = (type, msg) => {
    Toast.fire({
        icon: type,
        text: msg,
    });
};

export default makeToast;