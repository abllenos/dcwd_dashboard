import React from "react";
import { Modal } from "./Modal";

export interface AssetDetailClassification {
  name: string;
  count: number;
  workingCount?: number;
  notWorkingCount?: number;
}

export interface AssetDetailData {
  id: string;
  name: string;
  totalCount: number;
  classifications: AssetDetailClassification[];
}

export interface AssetDetailModalProps {
  open: boolean;
  onClose: () => void;
  asset: AssetDetailData;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ open, onClose, asset }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      title={asset.name}
      footer={null}
      maskClosable
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Total</strong>
          <span style={{ fontSize: 18 }}>{asset.totalCount}</span>
        </div>

        <div>
          <strong style={{ display: "block", marginBottom: 8 }}>Classifications</strong>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {asset.classifications.map((c, idx) => {
              const showStatus = typeof c.workingCount === 'number' || typeof c.notWorkingCount === 'number';
              const working = c.workingCount ?? 0;
              const notWorking = c.notWorkingCount ?? 0;
              const workingPct = c.count ? Math.round((working / c.count) * 100) : 0;
              const notWorkingPct = c.count ? Math.round((notWorking / c.count) * 100) : 0;
              return (
                <div key={idx} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "#666" }}>{c.name}</span>
                    <strong>{c.count}</strong>
                  </div>
                  {showStatus && (
                    <div style={{ display: "flex", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#4b5563", marginBottom: 4 }}>Working</div>
                        <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ width: `${workingPct}%`, background: "#10b981", height: "100%" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                          <span style={{ color: "#6b7280" }}>{workingPct}%</span>
                          <strong>{working}</strong>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#4b5563", marginBottom: 4 }}>Not Working</div>
                        <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ width: `${notWorkingPct}%`, background: "#ef4444", height: "100%" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
                          <span style={{ color: "#6b7280" }}>{notWorkingPct}%</span>
                          <strong>{notWorking}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AssetDetailModal;