export interface PositionModel {
  secId?: string;
  dateOfPrice?: Date;
  units?: number;
  unitPrice?: number;
  marketValue?: number;
  memo?: string;
  positionType?: string;
  placeholder?: boolean;
}
