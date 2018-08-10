import {Request} from 'express'
import {LocationSelectionType} from '@src/../../common/searchResults'

export interface JsonTokenDecoded {
    fullName: string
    username: string
    sessionId: string
    permissions: {
        dashboard: boolean
    }
}

export interface IRequest extends Request {
    decoded: JsonTokenDecoded
}

export interface Config {
    port: number
    isDev: boolean
    mode: 'dev' | 'prod'
    listRoutes: boolean
}

export interface ESOptions {
    Altitude?: number;
    Diameter?: number;
    Eff?: number;
    EffIb?: number;
    Gt?: number;
    HpaReqBackoff?: number;
    Latitude?: number;
    Longitude?: number;
    MinElAngle?: number;
    RefFreq?: number;
    SysNt?: number;
    TransmitFeedLoss?: number;
    WithinCoverage?: boolean;
    RestrictToBeam?: boolean;
    EsPrimaryKey?: string;
    City?: string;
    Country?: string;
    Name?: string;
    Bands?: string[];
    LocationSelectionType: LocationSelectionType;
}

export interface CarrierOptions {
    CodeRate?: number;
    DataRate?: number;
    RequiredAvailability?: number;
    SpreadingFactor?: number;
    RequiredEbno?: number;
    RequiredBandwidth?: number;
    BwAllocFactor?: number;
    RequiredMargin?: number;
    Modulation?: string;
}

export interface CapacitySearchSchemaV2 {
    IsDuplex?: boolean;
    ExcludeGuardBand?: boolean;
    IgnoreCarriers?: boolean;
    IgnoreCarrierDetails?: boolean;
    LeaseDetails?: boolean;
    LeasesOnly?: boolean;
    LinkBudget?: boolean;
    Visibility?: boolean;
    EntireTransponder?: boolean;
    DetailedSearch?: boolean;
    StartDate?: string;
    EndDate?: string;
    TxOptions: ESOptions;
    RxOptions: ESOptions;
    TxCarrier: CarrierOptions;
    RxCarrier: CarrierOptions;
    MaxPeBoverAllocBwMultiplier?: number;
}
