export const orderPlacedTemplate = (order: any, user: any) => `
  <div style="font-family:Arial;padding:20px;">
    <h2>🎉 Order Placed Successfully!</h2>
    <p>Hi ${user.name}, thank you for your purchase.</p>

    <h3>Order #${order.id}</h3>

    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;margin-top:15px;">
      <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
      ${order.items
        .map(
          (i: any) => `
        <tr>
          <td>${i.name}</td>
          <td>${i.quantity}</td>
          <td>₹${i.price}</td>
        </tr>
      `
        )
        .join("")}
    </table>

    <p style="margin-top:20px;font-size:16px;">
      <strong>Total: ₹${order.total}</strong>
    </p>

    <p>We will notify you once your order is shipped! 🚚</p>
  </div>
`;

export const orderStatusTemplate = (order: any) => `
  <div style="font-family:Arial;padding:20px;">
    <h2>📦 Order Update</h2>
    <p>Your order <strong>#${order.id}</strong> is now <strong>${order.status}</strong>.</p>

    ${
      order.trackingNumber
        ? `<p>Tracking Number: <strong>${order.trackingNumber}</strong></p>`
        : ""
    }
  </div>
`;

export const orderCanceledTemplate = (order: any) => `
  <div style="font-family:Arial;padding:20px;">
    <h2>❌ Order Canceled</h2>
    <p>Your order <strong>#${order.id}</strong> has been canceled.</p>
  </div>
`;
