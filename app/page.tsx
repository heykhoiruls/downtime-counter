"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LostCBPage() {
  const [rph, setRph] = useState<number | "">("");
  const [hp, setHp] = useState<number | "">("");

  const [lostCb, setLostCb] = useState<number | null>(null);
  const [downtime, setDowntime] = useState<number | null>(null);

  const [lostCbStatus, setLostCbStatus] = useState<string>("");
  const [downtimeStatus, setDowntimeStatus] = useState<string>("");

  useEffect(() => {
    if (rph === "" || hp === "") {
      setLostCb(null);
      setDowntime(null);
      setLostCbStatus("");
      setDowntimeStatus("");
      return;
    }

    const rph80 = rph * 0.8;

    // LOST CB (dibulatkan ke atas)
    let hasilLost = Math.ceil(rph80 - hp);

    if (hasilLost <= 0) {
      hasilLost = 0;
      setLostCbStatus("Tidak ada Lost CB");
    } else {
      setLostCbStatus("");
    }

    setLostCb(hasilLost);

    // DOWNTIME (dibulatkan ke atas)
    let hasilDowntime = Math.ceil((hasilLost * 480) / rph80);

    if (hasilDowntime <= 0) {
      hasilDowntime = 0;
      setDowntimeStatus("Tidak ada downtime");
    } else {
      setDowntimeStatus("");
    }

    setDowntime(hasilDowntime);
  }, [rph, hp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-start p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Kalkulator Lost CB & Downtime
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Perhitungan otomatis berdasarkan RPH dan HP
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {/* Input Grid */}
          <div className="grid grid-cols-1 gap-5">
            {/* Input RPH */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">
                RPH (Rencana Produksi Harian)
              </Label>
              <Input
                type="number"
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm"
                value={rph}
                onChange={(e) => {
                  const value = e.target.value;
                  setRph(value === "" ? "" : Number(value));
                }}
                placeholder="contoh: 10000"
              />
            </div>

            {/* Input HP */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">
                HP (Hasil Produksi)
              </Label>
              <Input
                type="number"
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm"
                value={hp}
                onChange={(e) => {
                  const value = e.target.value;
                  setHp(value === "" ? "" : Number(value));
                }}
                placeholder="contoh: 7500"
              />
            </div>
          </div>

          <Separator />

          {/* Hasil */}
          {lostCb !== null && downtime !== null && (
            <div className="space-y-4 text-center">
              {/* LOST CB */}
              {lostCbStatus ? (
                <p className="text-lg font-bold text-green-600 bg-green-100 py-2 rounded-xl">
                  {lostCbStatus}
                </p>
              ) : (
                <div className="bg-gray-100 rounded-xl py-3 shadow-sm">
                  <p className="text-lg font-semibold text-gray-700">
                    Lost CB: <span className="font-bold">{lostCb}</span>
                  </p>
                </div>
              )}

              {/* DOWNTIME */}
              {downtimeStatus ? (
                <p className="text-lg font-bold text-green-600 bg-green-100 py-2 rounded-xl">
                  {downtimeStatus}
                </p>
              ) : (
                <div className="bg-gray-100 rounded-xl py-3 shadow-sm">
                  <p className="text-lg font-semibold text-gray-700">
                    Downtime (menit):{" "}
                    <span className="font-bold">{downtime}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
