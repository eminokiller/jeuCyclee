<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=AdminRepository::class)
 * @UniqueEntity(fields="email", message="Sorry, this email address is already in use.", groups={"admin","joueur","user"})
 */
class Admin extends User
{
    /**
     * @ORM\ManyToOne(targetEntity=Admin::class, inversedBy="admins")
     */
    private $owner;

    /**
     * @ORM\OneToMany(targetEntity=Admin::class, mappedBy="owner")
     */
    private $admins;


    /**
     * @ORM\OneToMany(targetEntity=ActionMarketing::class, mappedBy="owner")
     */
    private $actionMarketings;

    /**
     * @ORM\OneToMany(targetEntity=TypeAction::class, mappedBy="owner")
     */
    private $typeActions;

    /**
     * @ORM\OneToMany(targetEntity=Question::class, mappedBy="owner")
     */
    private $questions;

    /**
     * @ORM\OneToMany(targetEntity=Joueur::class, mappedBy="owner")
     */
    private $joueurs;

    /**
     * @ORM\OneToMany(targetEntity=Equipe::class, mappedBy="owner")
     */
    private $equipes;

    /**
     * @ORM\OneToMany(targetEntity=Campagne::class, mappedBy="owner")
     */
    private $campagnes;

    /**
     * @ORM\OneToMany(targetEntity=GameSession::class, mappedBy="owner")
     */
    private $gameSessions;

    /**
     * @ORM\OneToMany(targetEntity=Task::class, mappedBy="owner")
     */
    private $tasks;

    public function __construct()
    {
        $this->roles = ['ROLE_ADMIN'];
        $this->admins = new ArrayCollection();
        $this->actionMarketings = new ArrayCollection();
        $this->typeActions = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->joueurs = new ArrayCollection();
        $this->equipes = new ArrayCollection();
        $this->campagnes = new ArrayCollection();
        $this->gameSessions = new ArrayCollection();
        $this->tasks = new ArrayCollection();
    }

    public function getOwner(): ?self
    {
        return $this->owner;
    }

    public function setOwner(?self $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getAdmins(): Collection
    {
        return $this->admins;
    }

    public function addAdmin(self $admin): self
    {
        if (!$this->admins->contains($admin)) {
            $this->admins[] = $admin;
            $admin->setOwner($this);
        }

        return $this;
    }

    public function removeAdmin(self $admin): self
    {
        if ($this->admins->removeElement($admin)) {
            // set the owning side to null (unless already changed)
            if ($admin->getOwner() === $this) {
                $admin->setOwner(null);
            }
        }

        return $this;
    }

    public function getGameSession(): ?GameSession
    {
        return $this->gameSession;
    }

    public function setGameSession(?GameSession $gameSession): self
    {
        $this->gameSession = $gameSession;

        return $this;
    }

    /**
     * @return Collection|ActionMarketing[]
     */
    public function getActionMarketings(): Collection
    {
        return $this->actionMarketings;
    }

    public function addActionMarketing(ActionMarketing $actionMarketing): self
    {
        if (!$this->actionMarketings->contains($actionMarketing)) {
            $this->actionMarketings[] = $actionMarketing;
            $actionMarketing->setOwner($this);
        }

        return $this;
    }

    public function removeActionMarketing(ActionMarketing $actionMarketing): self
    {
        if ($this->actionMarketings->removeElement($actionMarketing)) {
            // set the owning side to null (unless already changed)
            if ($actionMarketing->getOwner() === $this) {
                $actionMarketing->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TypeAction[]
     */
    public function getTypeActions(): Collection
    {
        return $this->typeActions;
    }

    public function addTypeAction(TypeAction $typeAction): self
    {
        if (!$this->typeActions->contains($typeAction)) {
            $this->typeActions[] = $typeAction;
            $typeAction->setOwner($this);
        }

        return $this;
    }

    public function removeTypeAction(TypeAction $typeAction): self
    {
        if ($this->typeActions->removeElement($typeAction)) {
            // set the owning side to null (unless already changed)
            if ($typeAction->getOwner() === $this) {
                $typeAction->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setOwner($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getOwner() === $this) {
                $question->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Joueur[]
     */
    public function getJoueurs(): Collection
    {
        return $this->joueurs;
    }

    public function addJoueur(Joueur $joueur): self
    {
        if (!$this->joueurs->contains($joueur)) {
            $this->joueurs[] = $joueur;
            $joueur->setOwner($this);
        }

        return $this;
    }

    public function removeJoueur(Joueur $joueur): self
    {
        if ($this->joueurs->removeElement($joueur)) {
            // set the owning side to null (unless already changed)
            if ($joueur->getOwner() === $this) {
                $joueur->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Equipe[]
     */
    public function getEquipes(): Collection
    {
        return $this->equipes;
    }

    public function addEquipe(Equipe $equipe): self
    {
        if (!$this->equipes->contains($equipe)) {
            $this->equipes[] = $equipe;
            $equipe->setOwner($this);
        }

        return $this;
    }

    public function removeEquipe(Equipe $equipe): self
    {
        if ($this->equipes->removeElement($equipe)) {
            // set the owning side to null (unless already changed)
            if ($equipe->getOwner() === $this) {
                $equipe->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Campagne[]
     */
    public function getCampagnes(): Collection
    {
        return $this->campagnes;
    }

    public function addCampagne(Campagne $campagne): self
    {
        if (!$this->campagnes->contains($campagne)) {
            $this->campagnes[] = $campagne;
            $campagne->setOwner($this);
        }

        return $this;
    }

    public function removeCampagne(Campagne $campagne): self
    {
        if ($this->campagnes->removeElement($campagne)) {
            // set the owning side to null (unless already changed)
            if ($campagne->getOwner() === $this) {
                $campagne->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|GameSession[]
     */
    public function getGameSessions(): Collection
    {
        return $this->gameSessions;
    }

    public function addGameSession(GameSession $gameSession): self
    {
        if (!$this->gameSessions->contains($gameSession)) {
            $this->gameSessions[] = $gameSession;
            $gameSession->setOwner($this);
        }

        return $this;
    }

    public function removeGameSession(GameSession $gameSession): self
    {
        if ($this->gameSessions->removeElement($gameSession)) {
            // set the owning side to null (unless already changed)
            if ($gameSession->getOwner() === $this) {
                $gameSession->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Task[]
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks[] = $task;
            $task->setOwner($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getOwner() === $this) {
                $task->setOwner(null);
            }
        }

        return $this;
    }
}
