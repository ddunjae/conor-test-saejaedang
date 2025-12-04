import nodemailer from 'nodemailer';
import { IOrder } from '../models/Order';

// Create email transporter
const createTransporter = () => {
  // Check if email configuration is available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️  Email credentials not configured. Email notifications disabled.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (order: IOrder): Promise<void> => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('📧 Email service not configured - skipping order confirmation email');
    return;
  }

  try {
    const itemsList = order.items
      .map(
        (item) =>
          `- ${item.name} (${item.nameEn}) x ${item.quantity} - ₩${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'SaeJaeDang <noreply@saejaedang.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `[새재당] 주문 확인 - ${order.orderNumber}`,
      text: `
새재당 주문이 접수되었습니다.

주문번호: ${order.orderNumber}
주문일시: ${order.createdAt.toLocaleString('ko-KR')}

=== 주문 상품 ===
${itemsList}

소계: ₩${order.subtotal.toLocaleString()}
배송비: ₩${order.shippingFee.toLocaleString()}
총액: ₩${order.total.toLocaleString()}

=== 배송 정보 ===
받는 분: ${order.customerInfo.name}
연락처: ${order.customerInfo.phone}
주소: [${order.customerInfo.zipCode}] ${order.customerInfo.address} ${order.customerInfo.detailAddress}
${order.customerInfo.deliveryMessage ? `배송 메시지: ${order.customerInfo.deliveryMessage}` : ''}

감사합니다.
새재당
      `,
      html: `
        <h2>새재당 주문이 접수되었습니다</h2>
        <p><strong>주문번호:</strong> ${order.orderNumber}</p>
        <p><strong>주문일시:</strong> ${order.createdAt.toLocaleString('ko-KR')}</p>

        <h3>주문 상품</h3>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.name} (${item.nameEn}) x ${item.quantity} - ₩${(
                  item.price * item.quantity
                ).toLocaleString()}</li>`
            )
            .join('')}
        </ul>

        <p><strong>소계:</strong> ₩${order.subtotal.toLocaleString()}</p>
        <p><strong>배송비:</strong> ₩${order.shippingFee.toLocaleString()}</p>
        <p><strong>총액:</strong> ₩${order.total.toLocaleString()}</p>

        <h3>배송 정보</h3>
        <p><strong>받는 분:</strong> ${order.customerInfo.name}</p>
        <p><strong>연락처:</strong> ${order.customerInfo.phone}</p>
        <p><strong>주소:</strong> [${order.customerInfo.zipCode}] ${order.customerInfo.address} ${order.customerInfo.detailAddress}</p>
        ${order.customerInfo.deliveryMessage ? `<p><strong>배송 메시지:</strong> ${order.customerInfo.deliveryMessage}</p>` : ''}

        <hr>
        <p>감사합니다.<br>새재당</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Order confirmation email sent for ${order.orderNumber}`);
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    // Don't throw - we don't want to fail the order if email fails
  }
};

// Send contact form notification email
export const sendContactNotificationEmail = async (
  name: string,
  email: string,
  phone: string | undefined,
  message: string
): Promise<void> => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('📧 Email service not configured - skipping contact notification email');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'SaeJaeDang <noreply@saejaedang.com>',
      to: process.env.ADMIN_EMAIL || 'admin@saejaedang.com',
      replyTo: email,
      subject: `[새재당] 새로운 문의 - ${name}`,
      text: `
새로운 문의가 접수되었습니다.

이름: ${name}
이메일: ${email}
${phone ? `전화번호: ${phone}` : ''}

메시지:
${message}
      `,
      html: `
        <h2>새로운 문의가 접수되었습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>전화번호:</strong> ${phone}</p>` : ''}
        <h3>메시지:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Contact notification email sent from ${email}`);
  } catch (error) {
    console.error('❌ Failed to send contact notification email:', error);
    // Don't throw - we don't want to fail the contact form if email fails
  }
};
