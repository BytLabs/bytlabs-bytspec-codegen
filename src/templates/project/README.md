# BytLabs.MicroserviceTemplate

# Project Overview

This project is organized following the principles of **Clean Architecture**, ensuring a clear separation of concerns across different layers. Each layer has specific responsibilities, reducing coupling and enhancing maintainability. Below is an outline of the layers and guidelines applied.

## Architecture Layers

### API Layer
- This layer serves as the entry point for handling external requests, particularly through **GraphQL**.
- **Responsibilities**:
  - Delegates control directly to the Application layer.
  - Contains **no business logic**; it’s purely for routing and delegating tasks.
  - Organized into folders by functionality for improved readability (aligns with **Clean Code** principles).
- **Key Points**:
  - **GraphQL Configuration**: Emphasis on properly configuring GraphQL, filtering, and sorting.
  - Uses **DTOs (Data Transfer Objects)** rather than exposing domain models directly.

### Infrastructure Layer
- This layer contains dependencies and implementations for all **3rd-party libraries**.
- **Responsibilities**:
  - Provides concrete implementations of interfaces defined in the Application layer.
  - Handles external integrations, database connections, and other dependencies.

### Application Layer
- This is where the main business orchestration happens, with the use of **Use Cases** and **Handlers**.
- **Responsibilities**:
  - Defines commands and queries, as well as their handlers.
  - Contains all **interfaces** that the Infrastructure layer will implement.
- **Key Points**:
  - The logic is organized as **command and query handlers** to separate commands (actions that change state) from queries (actions that retrieve data).

### Domain Layer
- The Domain layer encapsulates **domain entities** and **value objects**, representing the core business logic.
- **Responsibilities**:
  - Contains the **core models** of the system with no dependencies on external libraries or other project layers.
  - Enforces the domain’s rules and policies, independent of infrastructure concerns.

## Layer Dependency Flow

To maintain a clean structure, dependencies flow in a single direction as follows:

```
API -> Infrastructure -> Application -> Domain
```

Each layer only interacts with the layer directly beneath it, ensuring that changes in one layer don’t ripple unnecessarily through other parts of the system.

## Key Principles

- **Separation of Concerns**: Each layer has a clearly defined role to improve clarity and maintainability.
- **Dependency Inversion**: Core logic (Domain) remains independent of infrastructure or application logic.
- **DTO Usage**: Data Transfer Objects are used to expose data without exposing domain models directly.

---

This structured approach ensures the application is scalable, maintainable, and easy to extend over time.

## Domain AggregateRoot: Domain Layer

```csharp

 internal class OfferAggregate : AggregateRootBase<string>
    {
        public string? Id { get; set; }
        public OfferStatus Status {get;private set;}
        ...

        public NotificationAggregate(): base(Guid.NewGuid().ToString())
        {         
        }
        public void Accept()
        {
            Status = Accepted;
            AddDomainEvent(new OfferAcceptedDomainEvent(this));
        }
        
        public void Reject()
        {
            Status = Rejected;
            AddDomainEvent(new OfferRejectedDomainEvent(this));
        }
    }
```

##  Domain Event Definition: Domain Layer

```csharp

 internal class OfferAcceptedDomainEvent : IDomainEvent
    {
        public OfferAggregate OfferAggregate { get; private set; }
        ...

        public OfferAcceptedDomainEvent(OfferAggregate offer)
        {       
              OfferAggregate = offer;
        }
    }
```



## Application

```csharp
 public class AcceptOfferCommand : ICommand<Offer>
    {
        /// <summary>
        /// OfferId
        /// </summary>
        public string? OfferId { get; set; }
    
    }

    internal class AcceptOfferCommandHandler : ICommandHandler<AcceptOfferCommand, Offer>
    {
        private readonly IRepository<OfferAggregate,string> _offerRepository;
        private readonly IMapper _mapper;

        public AcceptOfferCommandHandler(IRepository<OfferAggregate,string> offerRepository, IMapper mapper)
        {
            _offerRepository = offerRepository;
            _mapper = mapper;
        }

        public async Task<Offer> Handle(AcceptOfferCommand request, CancellationToken cancellationToken)
        {
            var aggregate = await _offerRepository.GetAsync(request.OfferId);                    
            await _offerRepository.Update(aggregate, cancellationToken); // BB will execute Domain Event Hanlder and persist IntegrationEvents if were defined
            Offer dto = _mapper.Map<Offer>(aggregate);
            return dto;
        }
    }

```

##  Register IUserContextProvider with default implementations

```csharp
     services.AddUserContextProviders();
```

