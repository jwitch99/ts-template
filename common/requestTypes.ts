export interface OperatorNotesLineUpSchema {
    LineUpSuccessful: boolean
    LineupOperator: string
    StartDate: string
    DlkEIRP: number
    UlkEIRP: number
    CoNo: number
    CoNoSelected: string
    CustomerEbNo: number
    SelectedCustomerEbNo: string
    SignalQuality: string
    Comments: string
}

export interface OperatorNotesTeardownSchema {
    TeardownOperator: string
    ActualEndDate: string
    GoodNightCallBy: string
    GoodNightCallDate: string
    TeardownSignalQuality: string
    CustomerSatisfaction: string
    TeardownOperatorComments: string
}