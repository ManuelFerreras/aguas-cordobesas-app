export enum VariantEnum {
  primary = 'primary',
  secondary = 'secondary'
}

export type Variant = VariantEnum.primary | VariantEnum.secondary

export type Client = {
  id: number
  name: string
  agId: number
  ultimaDeuda: string
  utlimoPeriodo: string
  vtoUltimoPeriodo: string
}
