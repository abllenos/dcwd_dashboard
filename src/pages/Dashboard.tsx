import { dashboardStyles as s } from "../styles/DashboardStyle";
import { dashboardStyles as s } from "../styles/DashboardStyle";
import { AssetCard } from "../components/ui/AssetCard";
import { useAssetStore, fetchAssetData } from "../stores/assetStore";
import { useDashboardStore } from "../stores/dashboardStore";
import { Button } from "antd";

const Dashboard = () => {
  // Content-only; AppLayout renders sidebar and topbar
  const { assets, reorderAssets } = useAssetStore();
  const editMode = useDashboardStore((s) => s.editMode);
  const toggleEdit = useDashboardStore((s) => s.toggleEdit);

  // Handler for dynamically loading asset data per type
  const handleFetchAsset = async (type?: string) => {
    return await fetchAssetData(type);
  };

  return (
    <div>
        {/* Settings moved to its own tab/page (now in AppLayout) */}

        {/* Dashboard actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <Button type={editMode ? "primary" : "default"} onClick={toggleEdit}>
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>

        {/* STAT CARDS - Now using AssetCard component */}
          <div style={s.cards}>
            {assets.map((asset, index) => (
              <div
                key={asset.id}
                draggable={editMode}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", String(index));
                }}
                onDragOver={(e) => editMode && e.preventDefault()}
                onDrop={(e) => {
                  if (!editMode) return;
                  const fromIndex = Number(e.dataTransfer.getData("text/plain"));
                  const toIndex = index;
                  if (!Number.isNaN(fromIndex) && fromIndex !== toIndex) {
                    reorderAssets(fromIndex, toIndex);
                  }
                }}
                style={{ position: "relative" }}
              >
                <AssetCard asset={asset} />
              </div>
            ))}
            {/* Template card example: Fire Hydrants */}
            <AssetCard onFetch={handleFetchAsset} assetType="hydrants" />
          </div>

        {/* CHART PLACEHOLDER */}
        <div style={s.chart}>
          <strong>Monthly Leak Reports</strong>
          <div style={{ height: 200, color: "#999" }}>
            (You can plug chart here using Recharts or Chart.js)
          </div>
        </div>

        {/* TABLE */}
        <div style={s.table}>
          <strong>Leak Reports</strong>

          <table width="100%" style={{ marginTop: 12, fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#888" }}>
                <th>Reference No.</th>
                <th>Leak Type</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>202601BA61</td>
                <td>Mainline</td>
                <td>B4-7 P2 NHA ALPHA HOMES</td>
                <td><span style={s.statusGreen}>DISPATCHED</span></td>
              </tr>

              <tr>
                <td>2025126F88</td>
                <td>ServiceLine</td>
                <td>PRK II BAGO GALLERA</td>
                <td><span style={s.statusYellow}>UN-DISPATCH</span></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Dashboard;
