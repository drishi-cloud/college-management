import { COLORS } from '../utils/constants';

const Notification = ({ notification }) => {
  if (!notification) return null;

  const colors = {
    success: { bg: "#D1FAE5", text: "#065F46" },
    error: { bg: "#FEE2E2", text: "#991B1B" },
    info: { bg: "#E0F2FE", text: "#0369A1" }
  };

  const style = colors[notification.type] || colors.success;

  return (
    <div style={{
      position: "fixed",
      top: 80,
      right: 24,
      background: style.bg,
      color: style.text,
      padding: "12px 20px",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 14,
      zIndex: 200,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      animation: "fadeIn 0.3s ease"
    }}>
      {notification.msg}
    </div>
  );
};

export default Notification;