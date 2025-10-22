$(document).ready(function() {
  const $amount = $("#amount");
  const $gst = $("#gstRate");
  const $actual = $("#actualAmount");
  const $gstAmount = $("#gstAmount");
  const $total = $("#totalAmount");
  const $results = $("#results");
  const $hint = $("#hint");
  const $error = $("#error");
  const $calc = $("#calc");

  function calculateGST(animate = true) {
    let amount = parseFloat($amount.val());
    let gstPercent = parseFloat($gst.val());

    if (isNaN(amount) || amount < 0) {
      $error.text("Please enter a valid positive amount.").show();
      $results.slideUp(200);
      return;
    } else {
      $error.hide();
    }

    if (isNaN(gstPercent)) {
      $hint.text("Please select a GST rate to continue.");
      $results.slideUp(200);
      return;
    }

    let gstValue = amount * gstPercent / 100;
    let total = amount + gstValue;

    if (animate) {
      $results.stop(true).slideDown(200);
      $actual.fadeOut(100, function() {
        $(this).text(amount.toFixed(2)).fadeIn(200);
      });
      $gstAmount.fadeOut(100, function() {
        $(this).text(gstValue.toFixed(2)).fadeIn(200);
      });
      $total.fadeOut(100, function() {
        $(this).text(total.toFixed(2)).fadeIn(200);
      });
    } else {
      $actual.text(amount.toFixed(2));
      $gstAmount.text(gstValue.toFixed(2));
      $total.text(total.toFixed(2));
      $results.show();
    }

    $hint.text(`Applied GST: ${gstPercent}%`);
  }

  // --- jQuery Actions as per question ---
  $amount.on("input keyup paste", calculateGST);
  $gst.on("change", calculateGST);

  $amount.focus(() => $hint.text("Enter amount in numbers only."));
  $amount.blur(() => $hint.text("Type amount and select GST rate."));
  
  $calc.on("mouseenter", () => {
    $calc.addClass("hovered");
    $hint.text("Hovering on calculator...");
  });

  $calc.on("mouseleave", () => {
    $calc.removeClass("hovered");
    $hint.text("Type an amount and select a GST rate.");
  });

  $("#calcBtn").click(() => {
    calculateGST(true);
  });

  $("#resetBtn").click(resetAll);

  // Double-click reset
  $calc.on("dblclick", resetAll);

  function resetAll() {
    $amount.val("");
    $gst.val("");
    $actual.text("0.00");
    $gstAmount.text("0.00");
    $total.text("0.00");
    $results.slideUp(200);
    $error.hide();
    $hint.text("Calculator reset. Enter new values.");
  }

  // Initial calculation (in case of prefilled values)
  calculateGST(false);
});
