import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme';

interface SegmentedProps<T extends string | number> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

export function Segmented<T extends string | number>({ options, value, onChange }: SegmentedProps<T>) {
  return (
    <View style={styles.segmented}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable key={String(o.value)} onPress={() => onChange(o.value)} style={[styles.segment, active && styles.segmentActive]}>
            <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  format?: (v: number) => string;
}

export function Stepper({ value, onChange, step = 1, min = -Infinity, max = Infinity, format }: StepperProps) {
  const dec = () => onChange(Math.max(min, round(value - step)));
  const inc = () => onChange(Math.min(max, round(value + step)));
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperValue}>{format ? format(value) : String(value)}</Text>
      <Pressable onPress={dec} style={styles.stepBtn} disabled={value <= min}>
        <Ionicons name="remove" size={18} color={value <= min ? colors.textTertiary : colors.primary} />
      </Pressable>
      <View style={styles.stepDivider} />
      <Pressable onPress={inc} style={styles.stepBtn} disabled={value >= max}>
        <Ionicons name="add" size={18} color={value >= max ? colors.textTertiary : colors.primary} />
      </Pressable>
    </View>
  );
}

function round(v: number): number {
  return Math.round(v * 100) / 100;
}

const styles = StyleSheet.create({
  segmented: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: 8, padding: 2 },
  segment: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6, minWidth: 48, alignItems: 'center' },
  segmentActive: { backgroundColor: colors.card, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  segmentText: { ...fonts.footnote, color: colors.textSecondary },
  segmentTextActive: { color: colors.text, fontWeight: '600' },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepperValue: { ...fonts.body, color: colors.textSecondary, marginRight: spacing.md },
  stepBtn: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: colors.background, borderRadius: 6 },
  stepDivider: { width: 4 },
});
