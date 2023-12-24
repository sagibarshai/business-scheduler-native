export interface Props extends React.PropsWithChildren {
    disabled:boolean
    onNextStage:() => void
} 

export interface StyledProps extends Omit<Props,"onNextStage" | "children" > {}