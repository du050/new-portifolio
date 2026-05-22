import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  buildInitialMonitoringSnapshot,
  tickMonitoringSnapshot,
  type DevOpsMonitoringSnapshot,
} from '@/lib/devops-monitoring-data';

const TICK_INTERVAL_MS = 4000;
const INITIAL_LOAD_MS = 600;

interface UseLiveMonitoringDataResult {
  readonly snapshot: DevOpsMonitoringSnapshot | null;
  readonly isLoading: boolean;
  readonly lastUpdatedAt: string;
}

export function useLiveMonitoringData(): UseLiveMonitoringDataResult {
  const shouldReduceMotion = useReducedMotion();
  const [snapshot, setSnapshot] = useState<DevOpsMonitoringSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState('');

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      setSnapshot(buildInitialMonitoringSnapshot());
      setIsLoading(false);
      setLastUpdatedAt(new Date().toLocaleTimeString());
    }, INITIAL_LOAD_MS);
    return () => window.clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (isLoading || shouldReduceMotion) {
      return;
    }
    const intervalId = window.setInterval(() => {
      setSnapshot((current) => {
        if (!current) {
          return current;
        }
        setLastUpdatedAt(new Date().toLocaleTimeString());
        return tickMonitoringSnapshot(current);
      });
    }, TICK_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [isLoading, shouldReduceMotion]);

  return { snapshot, isLoading, lastUpdatedAt };
}
