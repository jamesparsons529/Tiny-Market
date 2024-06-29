
;; title: sip010-token
;; version:
;; summary:
;; description:

;; traits
;;
(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)


;; token definitions
;;
(define-fungible-token amazing-coin u100000000)

;; constants
;;
(define-constant contract-owner tx-sender)

(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u102))

;; data vars
;;

;; data maps
;;

;; public functions
;;
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
	(begin
		(asserts! (is-eq tx-sender sender) err-not-token-owner)
		(ft-transfer? amazing-coin amount sender recipient)
	)
)

(define-public (mint (amount uint) (recipient principal))
	(begin
		(asserts! (is-eq tx-sender contract-owner) err-owner-only)
		(ft-mint? amazing-coin amount recipient)
	)
)


;; read only functions
;;
(define-read-only (get-name)
	(ok "Amazing Coin")
)

(define-read-only (get-symbol)
	(ok "AC")
)

(define-read-only (get-decimals)
	(ok u6)
)

(define-read-only (get-balance (who principal))
	(ok (ft-get-balance amazing-coin who))
)

(define-read-only (get-total-supply)
	(ok (ft-get-supply amazing-coin))
)

(define-read-only (get-token-uri)
	(ok none)
)

;; private functions
;;

