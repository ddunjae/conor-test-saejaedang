import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware to handle errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Order validation rules
export const orderValidation = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.productId')
    .isInt({ min: 1 })
    .withMessage('Valid product ID is required'),
  body('items.*.name')
    .notEmpty()
    .trim()
    .withMessage('Product name is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Valid price is required'),
  body('customerInfo.name')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('customerInfo.phone')
    .notEmpty()
    .trim()
    .matches(/^[0-9-+() ]+$/)
    .withMessage('Valid phone number is required'),
  body('customerInfo.zipCode')
    .notEmpty()
    .trim()
    .withMessage('Zip code is required'),
  body('customerInfo.address')
    .notEmpty()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Address must be at least 5 characters'),
  body('customerInfo.detailAddress')
    .notEmpty()
    .trim()
    .withMessage('Detailed address is required'),
  body('customerInfo.deliveryMessage')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Delivery message must be less than 200 characters'),
  handleValidationErrors,
];

// Contact form validation rules
export const contactValidation = [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .notEmpty()
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9-+() ]+$/)
    .withMessage('Valid phone number format'),
  body('message')
    .notEmpty()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  handleValidationErrors,
];
