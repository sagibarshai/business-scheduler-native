export type InputState<T> = {
    value: T;
    error?: string;
    isEditMode?:boolean
    isValid?:boolean
    showErrorMessage?:boolean
}  