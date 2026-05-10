import 'package:intl/intl.dart';
import 'package:flutter/material.dart';

class Helpers {
  static String formatCurrency(double amount) {
    return NumberFormat.currency(locale: 'fr_FR', symbol: 'FCFA').format(amount);
  }

  static String formatDateShort(DateTime date) {
    return DateFormat('dd/MM/yyyy').format(date);
  }

  static void showSnackBar(BuildContext context, String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.red : Colors.green,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}
