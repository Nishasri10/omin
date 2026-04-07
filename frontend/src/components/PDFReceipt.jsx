// src/components/PDFReceipt.jsx
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export const generateReceiptPDF = async (order, user) => {
  const receiptHTML = `
    <div style="padding: 40px; font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1e293b; margin-bottom: 5px;">🛍️ OmniRetail POS</h1>
        <p style="color: #64748b; font-size: 12px;">123 Business Street, Cityville</p>
        <p style="color: #64748b; font-size: 12px;">Tel: +1 234 567 8900 | Email: support@omniretial.com</p>
        <p style="color: #64748b; font-size: 12px;">GST: 22AAAAA0000A1Z</p>
      </div>
      
      <div style="border-top: 1px dashed #cbd5e1; margin: 20px 0;"></div>
      
      <div style="margin-bottom: 20px;">
        <p><strong>Order #:</strong> ${order.orderNumber}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Cashier:</strong> ${user?.name || 'Customer'}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}</p>
        ${order.transactionId ? `<p><strong>Transaction ID:</strong> ${order.transactionId}</p>` : ''}
      </div>
      
      <div style="border-top: 1px solid #cbd5e1; margin: 20px 0;"></div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
            <th style="padding: 10px; text-align: right;">Total</th>
           </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td style="padding: 10px;">${item.name}</td>
              <td style="padding: 10px; text-align: center;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right;">$${item.price.toFixed(2)}</td>
              <td style="padding: 10px; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div style="border-top: 1px solid #cbd5e1; margin: 20px 0;"></div>
      
      <div style="text-align: right;">
        <p><strong>Subtotal:</strong> $${(order.pricing.total / 1.1).toFixed(2)}</p>
        <p><strong>Tax (10%):</strong> $${(order.pricing.total * 0.0909).toFixed(2)}</p>
        <p><strong>Shipping:</strong> $5.00</p>
        <h3 style="margin-top: 10px;"><strong>Total:</strong> $${order.pricing.total.toFixed(2)}</h3>
      </div>
      
      <div style="border-top: 1px dashed #cbd5e1; margin: 20px 0;"></div>
      
      <div style="text-align: center; color: #64748b; font-size: 12px;">
        <p>Thank you for shopping with us!</p>
        <p>We hope to see you again soon.</p>
        <p style="margin-top: 10px;">★★★★★</p>
      </div>
    </div>
  `;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = receiptHTML;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  document.body.appendChild(tempDiv);

  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`receipt_${order.orderNumber}.pdf`);
    
    toast.success('Receipt downloaded successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate receipt');
  } finally {
    document.body.removeChild(tempDiv);
  }
};