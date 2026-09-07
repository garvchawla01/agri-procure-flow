import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function TokenQR({ value, size = 168 }: { value: string; size?: number }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(`KISANSETU:${value}`, {
      width: size * 2,
      margin: 1,
      color: { dark: "#5A3218", light: "#FFFDF7" },
    })
      .then((url) => {
        if (alive) setSrc(url);
      })
      .catch(() => setSrc(""));
    return () => {
      alive = false;
    };
  }, [value, size]);

  return (
    <div
      className="flex items-center justify-center rounded-xl border border-border bg-card p-2"
      style={{ width: size + 16, height: size + 16 }}
    >
      {src ? (
        <img src={src} alt={`QR code for token ${value}`} width={size} height={size} />
      ) : (
        <span className="text-xs text-muted-foreground">QR…</span>
      )}
    </div>
  );
}
