export interface ESSearchResult extends Entity {
    Longitude: number,
    Latitude: number,
    Diameter: number,
    Altitude: number,
    GT: number,
    HPAReqBackoff: number,
    FeedLoss: number,
    TxEff: number,
    RxEff: number,
    RefFreq: number,
    NoiseTmp: number,
}

export interface ES extends Entity {
    Altitude: number
    AntennaCode: string
    ApprovalMethod: string
    ApprovalStatus: string
    Band: string
    Capability: string
    City: string
    Code: string
    Country: string
    Carriers: {
        Transmit: CarrierSearchResults[]
        Receive: CarrierSearchResults[]
    }
    Diameter: number
    DownConverters: DownConverter[]
    DownlinkIFFrequency: string
    Duration: string
    DurationType: string
    DynamicRange: string
    EndDate: string
    ErrorMessage: string
    HasAutoUplinkPowerCtrl: boolean
    IsApprovedForOccUse: boolean
    IsMobile: boolean
    Latitude: number
    Longitude: number
    Owner: string
    RxAmbientTemp: number
    RxAntennaNoiseTemp: number
    RxComputeFlag: number
    RxEfficiency: number
    RxFeedLoss: number
    RxFrequencyRangeEnd: number
    RxFrequencyRangeStart: number
    RxGTAtRefFreq: number
    RxLNANoiseTemp: number
    RxMispointingLoss: string
    RxPolarization: string
    RxPolarizationIsolation: number
    RxRandomLoss: number
    RxReferenceFrequency: number
    RxReferenceGain: number
    RxSidelobeGainEnvelopeFrom: number
    RxSidelobeGainEnvelopeTo: number
    RxSystemGT: number
    RxSystemNoiseTemp: number
    SiteCode: string
    StartDate: string
    TechnicalContactPoint: string
    TxEfficiency: number
    TxFeedLoss: number
    TxFrequencyRangeEnd: number
    TxFrequencyRangeStart: number
    TxHPAOperationLoss: number
    TxHPAOutputBackoffLimit: number
    TxHPAPowerRating: string
    TxMispointingLoss: number
    TxPolarization: string
    TxPolarizationIsolation: number
    TxRandomLoss: number
    TxReferenceFrequency: number
    TxReferenceGain: number
    TxSidelobeGainEnvelopeFrom: number
    TxSidelobeGainEnvelopeTo: number
    UpConverters: UpConverter[]
    UplinkIFFrequency: string
    UplinkPowerCtrl: string
    SegmentPrimaryKey: string
}

export interface CarrierSearchResults extends Entity {
    Bandwidth: number
    BeginFrequency: number
    Customer: string
    DownlinkCenterFrequency: number
    DownlinkIFFrequency: string
    EndDate: string
    EndFrequency: number
    InformationRate: number
    Network: string
    ReceiveEarthStationName: string
    ReceiveEarthStationPrimaryKey: string
    StartDate: string
    Status: string
    TransmitEarthStationName: string
    TransmitEarthStationPrimaryKey: string
    Transponder: string
    UplinkCenterFrequency: number
    UplinkIFFrequency: string
    SatellitePrimaryKey: string
    OperationCenter: string
}

export interface UpConverter {
    ConversionFrequency: number
    IFEndFrequency: number
    IFStartFrequency: number
    Location: string
    Name: string
    RFEndFrequency: number
    RFStartFrequency: number
    SecondConversionFrequency: number
    SecondIFEndFrequency: number
    SecondIFStartFrequency: number
    SpectrumInversion: boolean
}

export interface DownConverter {
    ConversionFrequency: number
    IFEndFrequency: number
    IFStartFrequency: number
    Location: string
    Name: string
    RFEndFrequency: number
    RFStartFrequency: number
    SecondConversionFrequency: number
    SecondIFEndFrequency: number
    SecondIFStartFrequency: number
    SpectrumInversion: boolean
}

export interface Customer extends Entity {
}

export interface SatelliteSeries {
    BW: number
    Name: string
    Type: string
}

export interface CarrierStatusSeries {
    NumObjects: number
    Type: string
}

export interface LeaseStatusSeries {
    NumObjects: number
    Type: string
}

export interface LeaseSeries {
    BW: number
    Operator: string
}

export interface ContractStatusSeries {
    NumObjects: number
    Type: string
}

export interface CustomerSeries {
    BW: number
    DataRate: number
    Name: string
    Revenue: number
}

export interface DashboardData {
    satelliteSeries: SatelliteSeries[]
    carrierStatusSeries: CarrierStatusSeries[]
    leaseStatusSeries: LeaseStatusSeries[]
    leaseSeries: LeaseSeries[]
    contractStatusSeries: ContractStatusSeries[]
    customerSeries: {
        byBandwidth: CustomerSeries[],
        byDataRate: CustomerSeries[],
        byRevenue: CustomerSeries[]
    }
    dataPipeSeries: any[]
}

export interface Carrier extends Entity {
    AllocatedBandwidth: number
    AutoUplinkPowerControl: boolean
    BandwidthAllocationFactor: number
    CarrierNetwork: string
    CodeRate: number
    Coding: string
    CompositeDataRate: number
    Customer: string
    CustomerCarrierContract: string
    DlkCenterFrequency: number
    DlkEIRPBP: number
    DlkEIRPDensity: number
    DlkEIRPES: number
    DlkMiscellaneousLosses: number
    DlkThermalCN: number
    Duration: string
    DynamicRange: string
    EbNoThreshold: number
    EndDate: string
    EndUser: string
    EntityOwner: string
    FilterRollOffFactor: number
    FixedFrequency: boolean
    FixedPower: boolean
    HPAPwr: number
    HPAPwrDB: number
    IBOEIRPConversionFactor: number
    IMUXResponse: number
    InformationRate: number
    InputBackoff: number
    LeaseName: string
    LeasedBandwidth: number
    MaxUlkEIRPConstraint: number
    Modulation: string
    ModulationTypeBPS: number
    MultipleAccessType: string
    NetworkRole: string
    NoiseBandwidth: number
    OMUXResponse: number
    OccasionalUse: boolean
    OperationCenter: string
    OperatorId: string
    OutputBackoff: number
    Overhead: number
    PowerEquivalentBandwidth: number
    PowerOrPerformance: string
    PredictedAvailability: number
    PredictedCN: number
    PredictedEbNo: number
    PredictedMargin: number
    ReceiveEarthStation: string
    ReedSolomonK: string
    ReedSolomonN: string
    RequiredAvailability: number
    RequiredBER: number
    RequiredMargin: number
    Reviewed: boolean
    SalesPointOfContact: string
    SatelliteName: string
    ServiceDescription: string
    SpreadingFactor: number
    StartDate: string
    State: string
    TechType: string
    TotalDownlinkACI: number
    TotalDownlinkASI: number
    TotalDownlinkCCI: number
    TotalESHPAIntermod: number
    TotalTransponderHPAIntermod: number
    TotalUplinkASI: number
    TotalUplinkCCI: number
    TransferCsm: boolean
    TransmitEarthStation: string
    Transponder: string
    UlkCenterFrequency: number
    UlkEIRP: number
    UlkEIRPDensity: number
    UlkMiscellaneousLosses: number
    UlkPSD: number
    UlkThermalCN: number
    UseBandwidthEquivalentPower: boolean
}

export interface ESBase extends Entity {
    Code: string
    Converter: string
    Diameter: number
    HPAGT: number
    IFFrequency: string
    Latitude: number
    Longitude: number
    ModemID: string
    ModemLoc: string
}

export interface TxEs extends ESBase{

}

export interface RxEs extends ESBase {
}

export interface MonitoringSite extends Entity{
    CN: string
    CNo: string
    DataEbNo: string
    DecodedBER: string
    Diameter: number
    Latitude: number
    Longitude: number
    Polarization: string
    RxDCIFFreq: string
}

export interface CarrierDetails {
    carrier: Carrier
    txEs: TxEs[]
    rxEs: RxEs[]
}

export interface ChangeLog {
    ChangeType: string,
    Database: string,
    EntityId: string,
    LogMessage: string,
    UpdatedBy: string,
    UpdatedOn: string
}


export interface OperatorNotes {
    ActualEndDate: string;
    ActualStartDate: string;
    CoNo: number;
    CoNoEarthStation: string;
    CoNoEarthStationName: string;
    CustomerEbNo: number;
    CustomerEbNoEarthStation: string;
    CustomerEbNoEarthStationName: string;
    CustomerSatisfaction: string;
    DlkEIRP: number;
    GoodNightCallBy: string;
    GoodNightCallDate: string;
    LineupOperator: string;
    LineupOperatorComments: string;
    LineupOperatorName: string;
    LineupSignalQuality: string;
    LineupSuccessful: boolean;
    TeardownOperator: string;
    TeardownOperatorComments: string;
    TeardownOperatorName: string;
    TeardownSignalQuality: string;
    UlkEIRP: number;
}

export interface CarrierOperator extends Entity {
}

export interface Entity {
    PrimaryKey: string,
    Name: string
}

export interface Satellite {
    Inclination: number;
    IsActive: boolean;
    IsSatVisible: boolean;
    Longitude: number;
    Name: string;
    NumberOfXpdrsBeforeOwned: number;
    PlatformAzimuthBias: number;
    PlatformElevationBias: number;
    PlatformYawBias: number;
    PrimaryKey: string;
}

export interface CapacitySearchResult {
    AntennaWarning: string;
    BuyValue: string;
    ErrorMessages: string;
    FootNote: string;
    InboundAllocatedBandwidth: string;
    InboundCarrierLeaseBandwidth: string;
    InboundEsEIRP: string;
    InboundEsHPAPower: string;
    InboundPowerEquivalentBandwidth: string;
    Lease: string;
    LeaseBandwidth: string;
    LeasePrimaryKey: string;
    OutboundAllocatedBandwidth: string;
    OutboundCarrierLeaseBandwidth: string;
    OutboundEsEIRP: string;
    OutboundEsHPAPower: string;
    OutboundPowerEquivalentBandwidth: string;
    SatelliteLongitude: number;
    SatelliteName: string;
    SatellitePrimaryKey: string;
    SellValue: string;
    TotalAllocatedBandwidth: string;
    TotalPowerEquivalentBandwidth: string;
    Transponder: string;
    TransponderPrimaryKey: string;
}


export interface City {
    Name: string,
    PrimaryKey: string,
    Longitude: number,
    Latitude: number,
    Altitude: number
}

export enum LocationSelectionType {
    ES = 0,
    Map = 1,
    LatLong = 2,
    Place = 3
}


export interface Polygon {
    Gain: number,
    Height: number,
    Points: number[]
}

export interface Beam {
    Ulk: Polygon[],
    Dlk: Polygon[]
}