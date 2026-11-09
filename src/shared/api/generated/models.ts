// src/shared/api/generated/models.ts — aliases over generated schema.d.ts. Do not add fields here.
import type { components, operations } from './schema';

type Json<T> = T extends { content: { 'application/json': infer B } } ? B : never;

// ── auth ──
export type LoginRequest = operations['loginUser']['requestBody']['content']['application/json'];
export type LoginUserResponse = Json<operations['loginUser']['responses']['200']>;
export type Session = components['schemas']['Session'];

// ── vehicle ──
export type Vehicle = components['schemas']['Vehicle'];
export type ListVehiclesParams = NonNullable<operations['listVehicles']['parameters']['query']>;
export type ListVehiclesResponse = Json<operations['listVehicles']['responses']['200']>;

// ── fleet ──
export type FleetOverview = components['schemas']['FleetOverview'];
export type GetFleetOverviewResponse = Json<operations['getFleetOverview']['responses']['200']>;

// ── route ──
export type Route = components['schemas']['Route'];
export type ListRoutesResponse = Json<operations['listRoutes']['responses']['200']>;

// ── trip ──
export type CreateTripRequest = operations['createTrip']['requestBody']['content']['application/json'];
export type CreateTripResponse = Json<operations['createTrip']['responses']['201']>;
export type Trip = components['schemas']['Trip'];

// ── telemetry ──
export type GetTelemetryContextParams = NonNullable<operations['getTelemetryContext']['parameters']['path']>;
export type GetTelemetryContextResponse = Json<operations['getTelemetryContext']['responses']['200']>;
export type TelemetryContext = components['schemas']['TelemetryContext'];

// ── score ──
export type GetDriverScoreParams = NonNullable<operations['getDriverScore']['parameters']['path']>;
export type GetDriverScoreResponse = Json<operations['getDriverScore']['responses']['200']>;
export type ListDriverScoresParams = NonNullable<operations['listDriverScores']['parameters']['query']>;
export type ListDriverScoresResponse = Json<operations['listDriverScores']['responses']['200']>;
export type DriverScoreResult = components['schemas']['DriverScoreResult'];
export type DriverEvent = components['schemas']['DriverEvent'];
export type DrivingStyleMetric = components['schemas']['DrivingStyleMetric'];

// ── certificate ──
export type GenerateCertificateRequest = operations['generateCertificate']['requestBody']['content']['application/json'];
export type GenerateCertificateResponse = Json<operations['generateCertificate']['responses']['200']>;
export type Certificate = components['schemas']['Certificate'];

// ── errors ──
export type ApiErrorBody = components['schemas']['ApiError'];
