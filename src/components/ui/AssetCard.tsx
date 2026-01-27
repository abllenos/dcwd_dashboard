import React, { useState } from "react";
import { Card } from "./Card";
import { AssetDetailModal } from "./AssetDetailModal";
import { useDashboardStore } from "../../stores/dashboardStore";
import { useAssetStore } from "../../stores/assetStore";
import { Modal } from "./Modal";

export interface AssetClassification {
  name: string;
  count: number;
  // Optional breakdown for status
  workingCount?: number;
  notWorkingCount?: number;
}

export interface AssetData {
  id: string;
  name: string;
  totalCount: number;
  classifications: AssetClassification[];
  icon?: React.ReactNode;
}

export interface AssetCardProps {
  asset?: AssetData; // Can be undefined for empty/loading cards
  onFetch?: (assetType?: string) => Promise<AssetData>; // For dynamic loading per asset type
  assetType?: string; // Template card type identifier
  style?: React.CSSProperties;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset: initialAsset, onFetch, assetType, style }) => {
  const [asset, setAsset] = useState<AssetData | undefined>(initialAsset);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const editMode = useDashboardStore((s) => s.editMode);
  const removeAsset = useAssetStore((s) => s.removeAsset);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Handle click - fetch if needed, then toggle
  const handleClick = async () => {
    if (editMode) return; // In edit mode, disable opening detail modal
    if (!asset && onFetch) {
      setLoading(true);
      try {
        const data = await onFetch(assetType);
        setAsset(data);
        setOpen(true);
      } catch (error) {
        console.error("Failed to fetch asset data:", error);
      } finally {
        setLoading(false);
      }
    } else if (asset) {
      setOpen(true);
    }
  };

  if (loading) {
    return (
      <Card style={{ ...cardStyle, cursor: "pointer", ...style }}>
        <div style={loadingStyle}>Loading...</div>
      </Card>
    );
  }

  if (!asset) {
    return (
      <Card style={{ ...cardStyle, cursor: "pointer", opacity: 0.6, ...style }}>
        <div onClick={handleClick} style={emptyCardStyle}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>+</div>
          <p style={{ margin: 0, fontSize: 14 }}>Click to load</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card style={{ ...cardStyle, cursor: "pointer", ...style }}>
        <div onClick={handleClick}>
          <div style={headerStyle}>
            <div style={{ flex: 1 }}>
              <p style={labelStyle}>{asset.name}</p>
              <h2 style={countStyle}>{asset.totalCount}</h2>
            </div>
            {editMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmOpen(true);
                }}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  color: "#ef4444",
                  cursor: "pointer",
                  lineHeight: "22px",
                  textAlign: "center",
                }}
                aria-label="Remove card"
                title="Remove card"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </Card>

      <AssetDetailModal
        open={open}
        onClose={() => setOpen(false)}
        asset={{
          id: asset.id,
          name: asset.name,
          totalCount: asset.totalCount,
          classifications: asset.classifications.map((c) => ({
            name: c.name,
            count: c.count,
            workingCount: c.workingCount,
            notWorkingCount: c.notWorkingCount,
          })),
        }}
      />

      {/* Remove confirmation */}
      <Modal
        open={confirmOpen}
        title="Remove card?"
        okText="Remove"
        cancelText="Cancel"
        onOk={() => {
          removeAsset(asset.id);
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      >
        Are you sure you want to remove "{asset.name}" from the dashboard?
      </Modal>
    </>
  );
};

// Styles
const cardStyle: React.CSSProperties = {
  transition: "all 0.3s ease",
  cursor: "pointer",
  minHeight: 140,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const labelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  color: "#888",
  marginBottom: 8,
};

const countStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 36,
  fontWeight: "bold",
};

// Removed inline expansion styles; modal handles details view.

const emptyCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 120,
  color: "#999",
};

const loadingStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 120,
  color: "#999",
};

export default AssetCard;
