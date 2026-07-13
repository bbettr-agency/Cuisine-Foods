import {
  Truck, ShieldCheck, Recycle, Droplet, Flame, Clock, MapPin, BadgeCheck,
  Banknote, Leaf, Scale, Phone, MessageCircle, Check, Building2, Utensils,
  Factory, Hotel, Store, Sparkles, FileCheck, Thermometer, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/config/types";

const map: Record<IconName, React.ComponentType<LucideProps>> = {
  truck: Truck,
  "shield-check": ShieldCheck,
  recycle: Recycle,
  droplet: Droplet,
  flame: Flame,
  clock: Clock,
  "map-pin": MapPin,
  "badge-check": BadgeCheck,
  banknote: Banknote,
  leaf: Leaf,
  scale: Scale,
  phone: Phone,
  "message-circle": MessageCircle,
  check: Check,
  "building-2": Building2,
  utensils: Utensils,
  factory: Factory,
  hotel: Hotel,
  store: Store,
  sparkles: Sparkles,
  "file-check": FileCheck,
  thermometer: Thermometer,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name] ?? Droplet;
  return <Cmp aria-hidden strokeWidth={1.75} {...props} />;
}
