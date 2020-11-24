import { configUpdateStatus, configAddStatus } from "../Type";

export function addStatus(params) {
  return {
    type: configAddStatus,
    payload: { label: params.label, value: params.value },
  };
}
export function updateStatus(label, value) {
  return {
    type: configUpdateStatus,
    payload: { label, value },
  };
}
