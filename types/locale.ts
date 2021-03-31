import common from '../public/locales/en/common.json'
import { OnlyStringKeys } from './utilityTypes'

export interface Resources {
  common: OnlyStringKeys<typeof common>
}
