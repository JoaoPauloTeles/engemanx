/**
 * EngemanX Database Type Definitions
 * 
 * Baseado no schema PostgreSQL completo (88 tabelas)
 * Seguindo Clean Code: nomes claros, single responsibility, explícitos
 * 
 * Arquivo: src/types/database.types.ts
 */

// ============================================================================
// FOUNDATION TYPES
// ============================================================================

export interface Company {
  id: string;
  name: string;
  trade_name: string;
  tax_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  company_id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  company_id: string;
  code: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type LocationType = 'plant' | 'area' | 'line' | 'sector';

export interface Location {
  id: string;
  company_id: string;
  code: string;
  name: string;
  location_type: LocationType;
  parent_location_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  company_id: string;
  name: string;
  description: string | null;
  permissions: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// EQUIPMENT TYPES
// ============================================================================

export interface Equipment {
  id: string;
  company_id: string;
  tag: string;
  name: string;
  description: string | null;
  category_id: string;
  location_id: string | null;
  status_id: string;
  criticality_level_id: string | null;
  serial_number: string | null;
  model: string | null;
  manufacturer: string | null;
  installation_date: string | null;
  warranty_expiration: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EquipmentCategory {
  id: string;
  company_id: string;
  code: string;
  name: string;
  parent_category_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type EquipmentStatusType = 'operational' | 'stopped' | 'maintenance' | 'standby';

export interface EquipmentStatus {
  id: string;
  company_id: string;
  name: string;
  status_type: EquipmentStatusType;
  color_hex: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CriticalityLevel {
  id: string;
  company_id: string;
  level_value: number; // 1-5
  name: string;
  description: string | null;
  color_hex: string;
  created_at: string;
  updated_at: string;
}

export interface Component {
  id: string;
  company_id: string;
  equipment_id: string;
  code: string;
  name: string;
  description: string | null;
  part_number: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// CIL TYPES (Core Mobile App)
// ============================================================================

export type CILActivityType = 
  | 'cleaning_external'
  | 'cleaning_internal'
  | 'cleaning_general'
  | 'inspection_visual'
  | 'inspection_dimensional'
  | 'inspection_functional'
  | 'lubrication_grease'
  | 'lubrication_oil'
  | 'lubrication_spray'
  | 'adjustment'
  | 'tightening'
  | 'general';

export type FrequencyType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'hours';

export interface CILRoute {
  id: string;
  company_id: string;
  route_number: string;
  name: string;
  description: string | null;
  activity_type: CILActivityType;
  frequency_type: FrequencyType;
  frequency_value: number;
  estimated_duration_minutes: number;
  default_assigned_to: string | null;
  next_execution_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CILRouteEquipment {
  id: string;
  cil_route_id: string;
  equipment_id: string;
  sequence_order: number;
  estimated_duration_minutes: number | null;
  notes: string | null;
  created_at: string;
}

export interface CILChecklist {
  id: string;
  company_id: string;
  checklist_number: string;
  name: string;
  description: string | null;
  activity_type: CILActivityType;
  is_template: boolean;
  equipment_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type MeasurementType = 'boolean' | 'numeric' | 'text' | 'photo';

export interface CILChecklistItem {
  id: string;
  checklist_id: string;
  item_number: string;
  description: string;
  acceptance_criteria: string | null;
  measurement_type: MeasurementType | null;
  measurement_unit: string | null;
  expected_min_value: number | null;
  expected_max_value: number | null;
  requires_photo: boolean;
  sequence_order: number;
  is_mandatory: boolean;
  related_fmea_mode_id: string | null;
  created_at: string;
  updated_at: string;
}

export type CILExecutionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface CILRouteExecution {
  id: string;
  company_id: string;
  cil_route_id: string;
  execution_number: string;
  scheduled_date: string;
  started_at: string | null;
  completed_at: string | null;
  assigned_to: string;
  status: CILExecutionStatus;
  total_equipment: number;
  equipment_completed: number;
  total_items: number;
  items_completed: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CILChecklistExecution {
  id: string;
  route_execution_id: string;
  equipment_id: string;
  checklist_id: string | null;
  started_at: string | null;
  completed_at: string | null;
  status: CILExecutionStatus;
  total_items: number;
  items_ok: number;
  items_nok: number;
  items_na: number;
  anomalies_detected: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CILItemResult = 'ok' | 'nok' | 'na';

export interface CILItemResultRecord {
  id: string;
  checklist_execution_id: string;
  checklist_item_id: string;
  result: CILItemResult;
  measured_value: number | null;
  text_observation: string | null;
  photo_url: string | null;
  executed_at: string;
  executed_by: string;
  created_at: string;
}

export type CILAnomalySeverity = 'minor' | 'moderate' | 'serious' | 'critical';
export type CILAnomalyStatus = 'open' | 'in_analysis' | 'resolved' | 'rejected';

export interface CILAnomaly {
  id: string;
  company_id: string;
  anomaly_number: string;
  checklist_execution_id: string | null;
  equipment_id: string;
  title: string;
  description: string;
  severity: CILAnomalySeverity;
  status: CILAnomalyStatus;
  detected_by: string;
  detected_at: string;
  photo_urls: string[];
  requires_work_order: boolean;
  work_order_id: string | null;
  failure_cause_id: string | null;
  rca_analysis_id: string | null;
  resolved_at: string | null;
  resolved_by: string | null;
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CorrectiveActionType = 'immediate' | 'short_term' | 'long_term';
export type ActionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface CILCorrectiveAction {
  id: string;
  anomaly_id: string;
  action_number: string;
  description: string;
  action_type: CorrectiveActionType;
  responsible_id: string | null;
  due_date: string | null;
  status: ActionStatus;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// LUBRICATION TYPES
// ============================================================================

export type LubricantType = 'grease' | 'oil' | 'synthetic' | 'solid' | 'spray';

export interface Lubricant {
  id: string;
  company_id: string;
  code: string;
  name: string;
  lubricant_type: LubricantType;
  manufacturer: string | null;
  viscosity: string | null;
  specifications: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LubricationPoint {
  id: string;
  company_id: string;
  equipment_id: string;
  point_number: string;
  location_description: string;
  lubricant_id: string;
  quantity: number;
  quantity_unit: string;
  frequency_type: FrequencyType;
  frequency_value: number;
  method: string | null;
  next_lubrication_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LubricationHistory {
  id: string;
  lubrication_point_id: string;
  executed_at: string;
  executed_by: string;
  quantity_applied: number;
  notes: string | null;
  next_lubrication_date: string;
  created_at: string;
}

// ============================================================================
// WORK ORDER TYPES
// ============================================================================

export interface WorkOrder {
  id: string;
  company_id: string;
  wo_number: string;
  title: string;
  description: string | null;
  equipment_id: string;
  status_id: string;
  priority_id: string;
  maintenance_type_id: string;
  assigned_to: string | null;
  scheduled_start: string | null;
  scheduled_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  resulted_in_breakdown: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderStatus {
  id: string;
  company_id: string;
  name: string;
  is_closed: boolean;
  color_hex: string;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderPriority {
  id: string;
  company_id: string;
  name: string;
  level: number; // 1-5
  color_hex: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// MAINTENANCE TYPES
// ============================================================================

export interface MaintenanceType {
  id: string;
  company_id: string;
  code: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FailureCause {
  id: string;
  company_id: string;
  code: string;
  name: string;
  description: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// VIEW TYPES (Analytics)
// ============================================================================

export interface CILDashboardMetrics {
  company_id: string;
  total_routes: number;
  active_routes: number;
  total_executions: number;
  completed_executions: number;
  total_anomalies: number;
  open_anomalies: number;
  critical_anomalies: number;
  avg_completion_rate: number;
  avg_duration_minutes: number;
}

export interface CILOverdueRoute {
  route_id: string;
  route_number: string;
  route_name: string;
  next_execution_date: string;
  days_overdue: number;
  equipment_count: number;
  estimated_duration: number;
  assigned_to_name: string | null;
}

export interface CILEquipmentConformity {
  equipment_id: string;
  equipment_tag: string;
  equipment_name: string;
  total_inspections: number;
  conformity_rate: number;
  last_inspection_date: string | null;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  count?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: string;
}

// ============================================================================
// FORM TYPES (Validation)
// ============================================================================

export interface LoginForm {
  email: string;
  password: string;
}

export interface CILItemResultForm {
  checklist_item_id: string;
  result: CILItemResult;
  measured_value?: number;
  text_observation?: string;
  photo_url?: string;
}

export interface CILAnomalyForm {
  equipment_id: string;
  title: string;
  description: string;
  severity: CILAnomalySeverity;
  photo_urls: string[];
  requires_work_order: boolean;
}

export interface LubricationExecutionForm {
  lubrication_point_id: string;
  quantity_applied: number;
  notes?: string;
}

// ============================================================================
// EXTENDED TYPES (with Relations)
// ============================================================================

export interface CILRouteWithEquipment extends CILRoute {
  equipment: Array<{
    equipment_id: string;
    equipment: Equipment;
    sequence_order: number;
  }>;
}

export interface CILChecklistExecutionWithDetails extends CILChecklistExecution {
  equipment: Equipment;
  checklist: CILChecklist | null;
  item_results: CILItemResultRecord[];
}

export interface CILAnomalyWithDetails extends CILAnomaly {
  equipment: Equipment;
  detected_user: User;
  work_order: WorkOrder | null;
}

export interface LubricationPointWithDetails extends LubricationPoint {
  equipment: Equipment;
  lubricant: Lubricant;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;
export type Timestamp = string;

// Type guards
export function isValidResult(value: string): value is CILItemResult {
  return ['ok', 'nok', 'na'].includes(value);
}

export function isValidSeverity(value: string): value is CILAnomalySeverity {
  return ['minor', 'moderate', 'serious', 'critical'].includes(value);
}

export function isValidExecutionStatus(value: string): value is CILExecutionStatus {
  return ['pending', 'in_progress', 'completed', 'cancelled'].includes(value);
}