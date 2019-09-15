export const SweetType = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
    INPUT: 'input',
    PROMPT: 'prompt',
};

export interface SweetAlertType {
    show: boolean;
    title: string;
    type: string;
    text: string;
    showCancelButton: boolean;
    confirmButtonText: string;
    cancelButtonText: string;
    onConfirm: () => void;
    onCancel: () => void;
}
