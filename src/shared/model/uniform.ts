export const uniformServices = ['general', 'dps', 'pps', 'investigation'] as const;
export const uniformRankGroups = ['highest', 'senior-middle', 'junior-rank-file'] as const;
export const uniformDuties = [
  'external-service',
  'traffic-supervision',
  'motorcycle',
  'pps-line',
] as const;
export const uniformConditions = ['hot-climate', 'special-regiment'] as const;

export type UniformService = (typeof uniformServices)[number];
export type UniformGender = 'male' | 'female' | 'unisex';
export type UniformRankGroup = (typeof uniformRankGroups)[number];
export type UniformNorm = '1' | '1(1)' | '2' | '3' | '4' | '10' | '17';
export type UniformDuty = (typeof uniformDuties)[number];
export type UniformCondition = (typeof uniformConditions)[number];

export interface UniformEligibilityProfile {
  gender: Exclude<UniformGender, 'unisex'>;
  rankGroup: UniformRankGroup;
  service: UniformService;
  duties: UniformDuty[];
  conditions: UniformCondition[];
}

export const uniformNormLabels: Record<UniformNorm, string> = {
  '1': 'Норма № 1',
  '1(1)': 'Норма № 1(1)',
  '2': 'Норма № 2',
  '3': 'Норма № 3',
  '4': 'Норма № 4',
  '10': 'Норма № 10',
  '17': 'Норма № 17',
};

export const uniformRankGroupLabels: Record<UniformRankGroup, string> = {
  highest: 'Высший начальствующий состав',
  'senior-middle': 'Старший и средний начальствующий состав',
  'junior-rank-file': 'Младший состав и рядовые',
};

export const uniformServiceLabels: Record<UniformService, string> = {
  general: 'Общая форма',
  dps: 'ДПС',
  pps: 'ППС',
  investigation: 'Следствие',
};

export const uniformGenderLabels: Record<UniformGender, string> = {
  male: 'Мужская',
  female: 'Женская',
  unisex: 'Унисекс',
};

export const uniformDutyLabels: Record<UniformDuty, string> = {
  'external-service': 'Несение наружной службы',
  'traffic-supervision': 'Надзор за дорожным движением',
  motorcycle: 'Служба на мотоцикле',
  'pps-line': 'Строевое подразделение ППС',
};

export const uniformConditionLabels: Record<UniformCondition, string> = {
  'hot-climate': 'Жаркий климат',
  'special-regiment': 'Специальный полк полиции',
};

export function getApplicableUniformNorms(
  profile: UniformEligibilityProfile,
): UniformNorm[] {
  const baseNorm: UniformNorm =
    profile.gender === 'female'
      ? profile.rankGroup === 'highest'
        ? '1(1)'
        : '4'
      : profile.rankGroup === 'highest'
        ? '1'
        : profile.rankGroup === 'senior-middle'
          ? '2'
          : '3';

  const norms: UniformNorm[] = [baseNorm];
  if (
    profile.service === 'dps' &&
    profile.duties.some((duty) => duty === 'traffic-supervision' || duty === 'motorcycle')
  ) {
    norms.push('10');
  } else if (
    profile.service === 'pps' &&
    profile.duties.includes('pps-line') &&
    !profile.conditions.includes('hot-climate') &&
    !profile.conditions.includes('special-regiment')
  ) {
    norms.push('17');
  }

  return norms;
}
