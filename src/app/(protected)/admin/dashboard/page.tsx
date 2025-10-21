"use client";

import { User, UserPlus } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "@/components/ui/stat-card";
import {
  useActiveUsersCount,
  useInactiveUsersCount,
  useNewUsersCount,
  useTotalUserCount,
  useUserRetentionRate,
} from "@/hooks/analytics/track-growth.queries";

import DemographicAgePieChart from "./demographic-age";
import DemographicGenderPieChart from "./demographic-gender";
import DemographicRankPieChart from "./demographic-rank";
import TrackGrowthChart from "./track-growth";

export default function DashboardPage() {
  const [cutoff, setCutoff] = useState(50);
  const { data: userCount, isLoading: isLoadingUserCount } =
    useTotalUserCount();

  const { data: newUserCount, isLoading: isLoadingNewUserCount } =
    useNewUsersCount({
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .slice(0, 10),
      to: new Date().toISOString().slice(0, 10),
    });

  const { data: activeUserCount, isLoading: isLoadingActiveUserCount } =
    useActiveUsersCount({ minscore: cutoff });

  const { data: inactiveUserCount, isLoading: isLoadingInactiveUserCount } =
    useInactiveUsersCount({
      maxscore: cutoff,
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .slice(0, 10),
      to: new Date().toISOString().slice(0, 10),
    });

  // Calculate the current and previous month boundaries
  const now = new Date();
  const currFrom = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  const currTo = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .slice(0, 10);
  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevFrom = prevMonthDate.toISOString().slice(0, 10);
  const prevTo = new Date(now.getFullYear(), now.getMonth(), 0)
    .toISOString()
    .slice(0, 10);

  const { data: retentionRate, isLoading: isLoadingRetentionRate } =
    useUserRetentionRate({
      prevFrom,
      prevTo,
      currFrom,
      currTo,
    });

  return (
    <>
      <Head>
        <title>Dashboard | L2brary</title>
        <meta
          name="description"
          content="Your personal dashboard and overview"
        />
      </Head>
      <div className="container mx-auto space-y-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="flex w-full flex-row justify-end">
          <div className="flex flex-row gap-1">
            <Label className="w-sm">Mức hoạt động cut-off:</Label>
            <Input
              type="number"
              className="flex flex-shrink"
              value={cutoff}
              onChange={(e) => setCutoff(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Thành viên"
            icon={<User />}
            description="Số thành viên hiện tại"
            value={
              isLoadingUserCount ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : (
                userCount?.count
              )
            }
          />
          <StatCard
            title="Thành viên mới"
            icon={<UserPlus />}
            description="Số thành viên mới tham gia tháng này"
            value={
              isLoadingNewUserCount ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : (
                newUserCount?.count
              )
            }
          />
          <StatCard
            title="Thành viên hoạt động"
            icon={<User />}
            description="Số thành viên có mức hoạt động tốt"
            value={
              isLoadingActiveUserCount ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : (
                activeUserCount?.count
              )
            }
          />
          <StatCard
            title="Thành viên ít hoạt động"
            icon={<User />}
            description="Số thành viên có mức hoạt động thấp"
            value={
              isLoadingInactiveUserCount ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : (
                inactiveUserCount?.count
              )
            }
          />
          <StatCard
            title="Tỷ lệ giữ chân"
            icon={<User />}
            description="Tỷ lệ thành viên tiếp tục hoạt động so với trước"
            value={
              isLoadingRetentionRate ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : retentionRate !== undefined ? (
                `${(retentionRate.retentionRate * 100).toFixed(1)}%`
              ) : (
                "--"
              )
            }
          />
          <StatCard
            title="Tỷ lệ giữ chân"
            icon={<User />}
            description="Tỷ lệ thành viên tiếp tục hoạt động so với trước"
            value={
              isLoadingRetentionRate ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : retentionRate !== undefined ? (
                `${(retentionRate.retentionRate * 100).toFixed(1)}%`
              ) : (
                "--"
              )
            }
          />
          <StatCard
            title="Tỷ lệ giữ chân"
            icon={<User />}
            description="Tỷ lệ thành viên tiếp tục hoạt động so với trước"
            value={
              isLoadingRetentionRate ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : retentionRate !== undefined ? (
                `${(retentionRate.retentionRate * 100).toFixed(1)}%`
              ) : (
                "--"
              )
            }
          />
          <StatCard
            title="Tỷ lệ giữ chân"
            icon={<User />}
            description="Tỷ lệ thành viên tiếp tục hoạt động so với trước"
            value={
              isLoadingRetentionRate ? (
                <Spinner className="h-10 w-10 text-gray-400" />
              ) : retentionRate !== undefined ? (
                `${(retentionRate.retentionRate * 100).toFixed(1)}%`
              ) : (
                "--"
              )
            }
          />
          <Card className="col-span-3">
            <CardHeader>
              <h2>Biểu đồ Phát triển Năm vừa qua</h2>
            </CardHeader>
            <CardContent>
              <TrackGrowthChart />
            </CardContent>
          </Card>
        </div>

        <h2>Thông tin nhân khẩu học</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card className="col-span-1">
            <CardHeader>
              <h3 className="font-semibold">Thống kê theo cấp bậc</h3>
            </CardHeader>
            <CardContent>
              <DemographicRankPieChart />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <h3 className="font-semibold">Thống kê theo giới tính</h3>
            </CardHeader>
            <CardContent>
              <DemographicGenderPieChart />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <h3 className="font-semibold">Thống kê theo độ tuổi</h3>
            </CardHeader>
            <CardContent>
              <DemographicAgePieChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
