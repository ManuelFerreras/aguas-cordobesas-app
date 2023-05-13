import React, { FC } from 'react'
import { Variant } from '@/common/Types'

import styles from './LegendLabel.module.css'

interface LegendLabelProps {
  children: string
  variant: Variant
}

const LegendLabel: FC<LegendLabelProps> = ({ children, variant }) => {
  return (
    <p className={`${styles.legendLabel} ${styles[variant]}`}>{children}</p>
  )
}

export default LegendLabel
export type { LegendLabelProps }
